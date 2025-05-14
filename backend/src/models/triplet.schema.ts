import { z } from 'zod';
import { GraphType } from './triplet.model';

/**
 * Zod schema for Entity
 */
export const EntitySchema = z.object({
  id: z.string().describe('Unique identifier for the entity'),
  name: z.string().describe('Name or text representation of the entity'),
  label: z.string().describe('Label or short descriptor for the entity'),
  type: z
    .string()
    .describe(
      'Type of mathematical entity (e.g., axiom, lemma, conclusion, theorem, step, etc.)',
    ),
  start: z.boolean().describe('Whether the entity is the start of the proof'),
  end: z.boolean().describe('Whether the entity is the end of the proof'),
});

/**
 * Zod schema for Relation
 */
export const RelationSchema = z.object({
  source: z.string().describe('ID of the source entity'),
  target: z.string().describe('ID of the target entity'),
  type: z
    .string()
    .describe('Type of relation between entities (e.g., grounds, explains)'),
  name: z.string().describe('Name or description of the relation'),
});

/**
 * Zod schema for Triplet
 */
export const TripletSchema = z.object({
  entities: z.array(EntitySchema).describe('List of extracted entities'),
  relations: z
    .array(RelationSchema)
    .describe('List of relations between entities'),
});

// Export types derived from the schemas
export type Entity = z.infer<typeof EntitySchema>;
export type Relation = z.infer<typeof RelationSchema>;
export type Triplet = z.infer<typeof TripletSchema>;

// Export the GraphType for convenience
export { GraphType };
