import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { Triplet } from '../models/triplet.schema';
import {
  TRIPLET_EXTRACTION_PROMPT,
  TRIPLET_EXTRACTION_SYSTEM_MESSAGE,
  COURSE_PATTERN_PROMPT,
  COURSE_PATTERN_SYSTEM_MESSAGE,
  PROOF_PATTERN_APPLICATION_PROMPT,
} from './prompts';

@Injectable()
export class ExtractTripletsService {
  constructor(private openaiService: OpenAIService) {}

  /**
   * Extract triplets from a proof
   * @param proof The proof content
   * @param customPrompt Optional custom prompt
   * @param systemMessage Optional system message
   * @returns The extracted triplets
   */
  async extractTriplets(
    proof: string,
    customPrompt: string = TRIPLET_EXTRACTION_PROMPT,
    systemMessage: string = TRIPLET_EXTRACTION_SYSTEM_MESSAGE,
  ): Promise<Triplet> {
    return this.openaiService.extractTriplets(systemMessage, customPrompt, proof);
  }

  /**
   * Extract course pattern from course content
   * @param courseContent The course content
   * @returns The extracted course pattern
   */
  async extractCoursePattern(courseContent: string): Promise<Triplet> {
    return this.openaiService.extractTriplets(
      COURSE_PATTERN_SYSTEM_MESSAGE,
      COURSE_PATTERN_PROMPT,
      courseContent,
    );
  }

  /**
   * Apply course pattern to a proof
   * @param coursePattern The course pattern
   * @param proofContent The proof content
   * @returns The applied pattern
   */
  async applyPatternToProof(
    coursePattern: Triplet,
    proofContent: string,
  ): Promise<Triplet> {
    return this.openaiService.applyPatternToProof(
      TRIPLET_EXTRACTION_SYSTEM_MESSAGE,
      PROOF_PATTERN_APPLICATION_PROMPT,
      coursePattern,
      proofContent,
    );
  }
}
