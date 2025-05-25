import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { TripletSchema, Triplet } from '../models/triplet.schema';

@Injectable()
export class OpenAIService {
  private model: ChatOpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const modelName =
      this.configService.get<string>('OPENAI_LLM_MODEL') || 'gpt-4o-mini';
    const temperature = parseFloat(
      this.configService.get<string>('OPENAI_LLM_TEMPERATURE') || '0',
    );

    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: modelName,
      temperature: temperature,
    });
  }

  /**
   * Extract triplets from a proof using LangChain with structured output
   * @param systemMessage The system message
   * @param promptTemplate The prompt template
   * @param proof The proof content
   * @returns The extracted triplets
   */
  async extractTriplets(
    systemMessage: string,
    promptTemplate: string,
    proof: string,
  ): Promise<Triplet> {
    try {
      // Format the prompt template with the proof content
      const formattedPrompt = promptTemplate.replace('{proof}', proof);

      // Create a prompt template with system and human messages
      const prompt = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemMessage),
        new HumanMessage(formattedPrompt),
      ]);

      // Create a model with structured output
      const structuredModel = this.model.withStructuredOutput(TripletSchema);

      // Invoke the model with the formatted prompt
      const result = await structuredModel.invoke(await prompt.format({}));

      return result;
    } catch (error) {
      console.error('Error extracting triplets:', error);
      throw new Error(
        `Failed to extract triplets: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Resolve triplets using LangChain with structured output
   * @param systemMessage The system message
   * @param promptTemplate The prompt template
   * @param triplet The triplet to resolve
   * @returns The resolved triplet
   */
  async resolveTriplets(
    systemMessage: string,
    promptTemplate: string,
    triplet: Triplet,
  ): Promise<Triplet> {
    try {
      // Format the prompt template with the triplet content
      const formattedPrompt = promptTemplate
        .replace('{entities}', JSON.stringify(triplet.entities, null, 2))
        .replace('{relations}', JSON.stringify(triplet.relations, null, 2));

      // Create a prompt template with system and human messages
      const prompt = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemMessage),
        new HumanMessage(formattedPrompt),
      ]);

      // Create a model with structured output
      const structuredModel = this.model.withStructuredOutput(TripletSchema);

      // Invoke the model with the formatted prompt
      const result = await structuredModel.invoke(await prompt.format({}));

      return result;
    } catch (error) {
      console.error('Error resolving triplets:', error);
      throw new Error(
        `Failed to resolve triplets: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Apply course pattern to a proof using LangChain with structured output
   * @param systemMessage The system message
   * @param promptTemplate The prompt template
   * @param coursePattern The course pattern
   * @param proofContent The proof content
   * @returns The applied pattern
   */
  async applyPatternToProof(
    systemMessage: string,
    promptTemplate: string,
    coursePattern: Triplet,
    proofContent: string,
  ): Promise<Triplet> {
    try {
      // Format the prompt template with the course pattern and proof content
      const formattedPrompt = promptTemplate
        .replace('{course_pattern}', JSON.stringify(coursePattern, null, 2))
        .replace('{proof}', proofContent);

      // Create a prompt template with system and human messages
      const prompt = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemMessage),
        new HumanMessage(formattedPrompt),
      ]);

      // Create a model with structured output
      const structuredModel = this.model.withStructuredOutput(TripletSchema);

      // Invoke the model with the formatted prompt
      const result = await structuredModel.invoke(await prompt.format({}));

      return result;
    } catch (error) {
      console.error('Error applying pattern to proof:', error);
      throw new Error(
        `Failed to apply pattern to proof: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
