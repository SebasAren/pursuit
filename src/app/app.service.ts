import { Injectable } from '@nestjs/common';
import { PromptService } from '@pursuit/prompt';
import { ArxivService } from '@pursuit/arxiv';

@Injectable()
export class AppService {
  constructor(
    private promptService: PromptService,
    private arxivService: ArxivService
  ) {}
}
