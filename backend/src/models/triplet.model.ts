/**
 * Entity model representing a node in the knowledge graph
 */
export interface Entity {
  id: string;
  name: string;
  label: string;
  type: string;
  start: boolean;
  end: boolean;
}

/**
 * Relation model representing an edge in the knowledge graph
 */
export interface Relation {
  source: string;
  target: string;
  type: string;
  name: string;
}

/**
 * Triplet model representing a knowledge graph with entities and relations
 */
export interface Triplet {
  entities: Entity[];
  relations: Relation[];
}

/**
 * Graph type for storing in Neo4j
 */
export enum GraphType {
  COURSE_PATTERN = 'course_pattern',
  PROOF_EXAMPLE = 'proof_example',
}
