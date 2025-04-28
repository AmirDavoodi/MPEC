import { Injectable } from '@nestjs/common';
import { Neo4jService } from './neo4j/neo4j.service';

@Injectable()
export class AppService {
  constructor(private readonly neo4jService: Neo4jService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processContent(courseContent: string, proofContent: string) {
    try {
      return await this.neo4jService.processLatex(courseContent, proofContent);
    } catch (error) {
      console.error('Error in processContent:', error);
      throw error;
    }
  }
}
