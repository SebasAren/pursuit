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
  async createPromptInput({
    userPrompt,
    arxivSubject,
  }: PromptInfoInput): Promise<string> {
    const summary = await this.arxivService.getSummary(arxivSubject);
    const fullPrompt = `${userPrompt} Answer the above based on, based on: ${summary}`;
    return this.promptService.submitToLlm(fullPrompt);
  }
}
