import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptController } from './prompt.controller';
import { ArxivModule } from '@pursuit/arxiv';

@Module({
  controllers: [PromptController],
  providers: [PromptService],
  exports: [],
  imports: [ArxivModule],
})
export class PromptModule {}
