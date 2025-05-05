import { Injectable } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver(
      'bolt://10.10.104.116:7687',
      neo4j.auth.basic('neo4j', 'password'),
    );
  }

  async runQuery(query: string, params: any = {}) {
    const session: Session = this.driver.session();
    try {
      const result = await session.run(query, params);
      return result.records.map((record) => record.toObject());
    } finally {
      await session.close();
    }
  }

  async getGraph() {
    return this.runQuery('MATCH p=()-[r]->() RETURN p');
  }

  async processLatex(courseContent: string, proofContent: string) {
    // Here we'll implement the logic to process LaTeX content
    // For now, we'll just return a simple graph
    return this.getGraph();
  }

  onModuleDestroy() {
    this.driver.close();
  }
}
