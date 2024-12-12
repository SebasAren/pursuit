import { Injectable } from '@nestjs/common';
import { PromptService } from '@pursuit/prompt';
import { ArxivService } from '@pursuit/arxiv';
import { PromptInfoInput } from './app.input';

@Injectable()
export class AppService {
  constructor(
    private promptService: PromptService,
    private arxivService: ArxivService
  ) {}
  createPromptInput({ userPrompt, arxivSubject }: PromptInfoInput) {}
}
