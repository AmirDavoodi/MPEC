import { Injectable } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';
import { Triplet, Entity, Relation } from '../models/triplet.schema';
import { GraphType } from '../models/triplet.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Neo4jService {
  private driver: Driver;

  constructor(private configService: ConfigService) {
    const neo4jUrl =
      this.configService.get<string>('NEO4J_URL') || 'bolt://localhost:7687';
    const neo4jUser = this.configService.get<string>('NEO4J_USER') || 'neo4j';
    const neo4jPassword =
      this.configService.get<string>('NEO4J_PASSWORD') || 'password';

    this.driver = neo4j.driver(
      neo4jUrl,
      neo4j.auth.basic(neo4jUser, neo4jPassword),
    );
  }

  /**
   * Run a Cypher query
   * @param query The Cypher query
   * @param params The query parameters
   * @returns The query results
   */
  async runQuery(query: string, params: any = {}) {
    const session: Session = this.driver.session();
    try {
      const result = await session.run(query, params);
      return result.records.map((record) => record.toObject());
    } finally {
      await session.close();
    }
  }

  /**
   * Get the entire graph
   * @returns The graph data
   */
  async getGraph() {
    return this.runQuery('MATCH p=()-[r]->() RETURN p');
  }

  /**
   * Get a specific graph by type
   * @param graphType The graph type
   * @returns The graph data
   */
  async getGraphByType(graphType: GraphType) {
    return this.runQuery(
      'MATCH p=()-[r]->() WHERE r.graph_type = $graphType RETURN p',
      { graphType },
    );
  }

  /**
   * Clean the database
   * @returns The result of the operation
   */
  async cleanDatabase() {
    return this.runQuery('MATCH (n) DETACH DELETE n');
  }

  /**
   * Create a node in Neo4j
   * @param entity The entity to create
   * @param graphType The graph type
   * @returns The result of the operation
   */
  async createNode(entity: Entity, graphType: GraphType) {
    const query = `
      CREATE (n:Entity {
        id: $id,
        name: $name,
        label: $label,
        type: $type,
        start: $start,
        end: $end,
        graph_type: $graphType
      })
      RETURN n
    `;

    return this.runQuery(query, {
      ...entity,
      graphType,
    });
  }

  /**
   * Create a relation in Neo4j
   * @param relation The relation to create
   * @param graphType The graph type
   * @returns The result of the operation
   */
  async createRelation(relation: Relation, graphType: GraphType) {
    const query = `
      MATCH (source:Entity {id: $source, graph_type: $graphType})
      MATCH (target:Entity {id: $target, graph_type: $graphType})
      CREATE (source)-[r:RELATES {
        type: $type,
        name: $name,
        graph_type: $graphType
      }]->(target)
      RETURN r
    `;

    return this.runQuery(query, {
      ...relation,
      graphType,
    });
  }

  /**
   * Store triplets in Neo4j
   * @param triplet The triplet to store
   * @param graphType The graph type
   * @returns The result of the operation
   */
  async storeTriplets(triplet: Triplet, graphType: GraphType) {
    // Create all entities
    for (const entity of triplet.entities) {
      await this.createNode(entity, graphType);
    }

    // Create all relations
    for (const relation of triplet.relations) {
      await this.createRelation(relation, graphType);
    }

    return { success: true };
  }

  /**
   * Process LaTeX content
   * This is a placeholder that will be implemented in the app service
   * @param courseContent The course content
   * @param proofContent The proof content
   * @returns The result of the operation
   */
  async processLatex(courseContent: string, proofContent: string) {
    // This will be implemented in the app service
    return this.getGraph();
  }

  /**
   * Get visualization queries for Neo4j Browser
   * @returns The visualization queries
   */
  getVisualizationQueries() {
    return {
      coursePattern:
        'MATCH p=()-[r]->() WHERE r.graph_type = "course_pattern" RETURN p',
      proofExample:
        'MATCH p=()-[r]->() WHERE r.graph_type = "proof_example" RETURN p',
      bothGraphs: `
        MATCH pattern=()-[r1]->()
        WHERE r1.graph_type = "course_pattern"
        WITH collect(pattern) as patterns
        MATCH proof=()-[r2]->()
        WHERE r2.graph_type = "proof_example"
        WITH patterns, collect(proof) as proofs
        RETURN patterns, proofs
      `,
    };
  }

  onModuleDestroy() {
    this.driver.close();
  }
}
