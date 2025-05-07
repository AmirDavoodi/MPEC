import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { Triplet, Entity } from '../models/triplet.schema';
import { RESOLUTION_PROMPT, RESOLUTION_SYSTEM_MESSAGE } from './prompts';

@Injectable()
export class ResolveTripletsService {
  constructor(private openaiService: OpenAIService) {}

  /**
   * Cluster entities based on their labels
   * Note: This is a simplified version of the Python clustering
   * @param entities The entities to cluster
   * @returns The cluster labels
   */
  private clusterEntities(entities: Entity[]): number[] {
    // This is a simplified clustering that just groups by type
    // In a real implementation, you might want to use a more sophisticated approach
    // or integrate with a JS clustering library
    const typeMap = new Map<string, number>();
    let clusterCount = 0;

    return entities.map(entity => {
      if (!typeMap.has(entity.type)) {
        typeMap.set(entity.type, clusterCount++);
      }
      return typeMap.get(entity.type) || 0;
    });
  }

  /**
   * Resolve triplets into a DAG
   * @param triplet The triplet to resolve
   * @returns The resolved triplet
   */
  async resolveTriplets(triplet: Triplet): Promise<Triplet> {
    // Cluster entities (optional step, can be removed if not needed)
    const labels = this.clusterEntities(triplet.entities);
    console.log('Entity clusters:', labels);

    // Resolve using LangChain with structured output
    return this.openaiService.resolveTriplets(
      RESOLUTION_SYSTEM_MESSAGE,
      RESOLUTION_PROMPT,
      triplet,
    );
  }
}
