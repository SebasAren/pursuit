import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PromptModule } from '@pursuit/prompt';
import { ArxivModule } from '@pursuit/arxiv';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PromptModule, ArxivModule],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
