import { Test, TestingModule } from '@nestjs/testing';
import { PromptService } from './prompt.service';
import nock, { Scope } from 'nock';

describe('PromptService', () => {
  let service: PromptService;
  let llmMock: Scope;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptService],
    }).compile();
    service = module.get<PromptService>(PromptService);

    // mock potential llm endpoints
    llmMock = nock('https://prompt.llm.amsterdam');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should submit a text to the llm and receive an answer', () => {
    expect(service.submitToLlm('Conquer the world!')).resolves.toBe(
      "I'm sorry Dave, I'm afraid I can't do that."
    );
  });
});
