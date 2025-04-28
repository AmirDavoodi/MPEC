import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j/neo4j.service';

interface ProcessRequest {
  courseContent: string;
  proofContent: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly neo4jService: Neo4jService,
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
}
