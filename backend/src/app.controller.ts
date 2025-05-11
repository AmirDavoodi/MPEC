import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j/neo4j.service';
import { ExtractTripletsService } from './triplets/extract-triplets.service';
import { ResolveTripletsService } from './triplets/resolve-triplets.service';
import { processLatexForLLM } from './utils/latex.utils';
import { GraphType } from './models/triplet.model';

interface ProcessRequest {
  courseContent: string;
  proofContent: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly neo4jService: Neo4jService,
    private readonly extractTripletsService: ExtractTripletsService,
    private readonly resolveTripletsService: ResolveTripletsService,
  ) {}

  @Post('process')
  async processContent(@Body() request: ProcessRequest) {
    try {
      const result = await this.appService.processContent(
        request.courseContent,
        request.proofContent,
      );
      return result;
    } catch (error) {
      console.error('Error processing content:', error);
      throw error;
    }
  }

  @Get('graph')
  async getGraph() {
    return this.neo4jService.getGraph();
  }

  @Post('extract-course-pattern')
  async extractCoursePattern(
    @Body() request: { courseContent: string; prompt?: string },
  ) {
    try {
      // Clean the database
      await this.neo4jService.cleanDatabase();

      // Process LaTeX content
      const processedCourseContent = processLatexForLLM(request.courseContent);

      // Extract course pattern
      const coursePattern =
        await this.extractTripletsService.extractCoursePattern(
          processedCourseContent,
          request.prompt, // Pass the optional prompt
        );

      // Store course pattern in Neo4j
      await this.neo4jService.storeTriplets(
        coursePattern,
        GraphType.COURSE_PATTERN,
      );

      return {
        success: true,
        visualizationQueries: this.neo4jService.getVisualizationQueries(),
        coursePattern,
      };
    } catch (error) {
      console.error('Error extracting course pattern:', error);
      throw error;
    }
  }

  @Post('apply-pattern-to-proof')
  async applyPatternToProof(
    @Body()
    request: {
      proofContent: string;
      coursePattern: any;
      prompt?: string;
    },
  ) {
    try {
      // Process LaTeX content
      const processedProofContent = processLatexForLLM(request.proofContent);

      // Apply pattern to proof
      const proofTriplets =
        await this.extractTripletsService.applyPatternToProof(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          request.coursePattern,
          processedProofContent,
          request.prompt, // Pass the optional prompt
        );

      // Phase 2: Resolve triplets
      const resolvedTriplets =
        await this.resolveTripletsService.resolveTriplets(proofTriplets);

      // Store proof triplets in Neo4j
      await this.neo4jService.storeTriplets(
        resolvedTriplets,
        GraphType.PROOF_EXAMPLE,
      );

      return {
        success: true,
        visualizationQueries: this.neo4jService.getVisualizationQueries(),
        proofTriplets: resolvedTriplets,
      };
    } catch (error) {
      console.error('Error applying pattern to proof:', error);
      throw error;
    }
  }

  @Post('test-content')
  async testContent(
    @Body()
    request: {
      testContent: string;
      coursePattern: any;
      proofTriplets: any;
    },
  ) {
    try {
      // Process LaTeX content
      const processedTestContent = processLatexForLLM(request.testContent);

      // Apply pattern to test content
      const testTriplets = await this.extractTripletsService.applyPatternToTest(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        request.coursePattern,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        request.proofTriplets,
        processedTestContent,
      );

      // Store test triplets in Neo4j
      await this.neo4jService.storeTriplets(
        testTriplets,
        GraphType.TEST_EXAMPLE,
      );

      return {
        success: true,
        visualizationQueries: this.neo4jService.getVisualizationQueries(),
        testTriplets,
      };
    } catch (error) {
      console.error('Error testing content:', error);
      throw error;
    }
  }
}
