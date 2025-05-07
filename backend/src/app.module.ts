import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { OpenAIModule } from './openai/openai.module';
import { TripletsModule } from './triplets/triplets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Neo4jModule,
    OpenAIModule,
    TripletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
