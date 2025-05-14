import { Module } from '@nestjs/common';
import { OpenAIModule } from '../openai/openai.module';
import { ExtractTripletsService } from './extract-triplets.service';
import { ResolveTripletsService } from './resolve-triplets.service';

@Module({
  imports: [OpenAIModule],
  providers: [ExtractTripletsService, ResolveTripletsService],
  exports: [ExtractTripletsService, ResolveTripletsService],
})
export class TripletsModule {}
