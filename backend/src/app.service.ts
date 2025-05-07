import { Injectable } from '@nestjs/common';
import { Neo4jService } from './neo4j/neo4j.service';
import { ExtractTripletsService } from './triplets/extract-triplets.service';
import { ResolveTripletsService } from './triplets/resolve-triplets.service';
import { processLatexForLLM } from './utils/latex.utils';
import { GraphType } from './models/triplet.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly extractTripletsService: ExtractTripletsService,
    private readonly resolveTripletsService: ResolveTripletsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Process course and proof content
   * @param courseContent The course content
   * @param proofContent The proof content
   * @returns The result of the operation
   */
  async processContent(courseContent: string, proofContent: string) {
    try {
      // Clean the database
      await this.neo4jService.cleanDatabase();

      // Process LaTeX content
      const processedCourseContent = processLatexForLLM(courseContent);
      const processedProofContent = processLatexForLLM(proofContent);

      // Phase 1: Extract course pattern
      const coursePattern = await this.extractTripletsService.extractCoursePattern(
        processedCourseContent,
      );
      console.log(courseContent);

      // Store course pattern in Neo4j
      await this.neo4jService.storeTriplets(coursePattern, GraphType.COURSE_PATTERN);

      // Phase 1: Apply pattern to proof
      const proofTriplets = await this.extractTripletsService.applyPatternToProof(
        coursePattern,
        processedProofContent,
      );

      // Phase 2: Resolve triplets
      const resolvedTriplets = await this.resolveTripletsService.resolveTriplets(
        proofTriplets,
      );

      // Store proof triplets in Neo4j
      await this.neo4jService.storeTriplets(resolvedTriplets, GraphType.PROOF_EXAMPLE);

      // Return visualization queries
      return {
        success: true,
        visualizationQueries: this.neo4jService.getVisualizationQueries(),
        coursePattern,
        proofTriplets: resolvedTriplets,
      };
    } catch (error) {
      console.error('Error in processContent:', error);
      throw error;
    }
  }
}
