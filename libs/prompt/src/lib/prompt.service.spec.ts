import { Test, TestingModule } from '@nestjs/testing';
import { PromptService } from './prompt.service';

describe('PromptService', () => {
  let service: PromptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptService],
    }).compile();
    service = module.get<PromptService>(PromptService);

    // mock submitToLlm to prevent any outgoing http calls
    jest
      .spyOn(service, 'submitToLlm')
      .mockImplementation(
        async () => "I'm sorry Dave, I'm afraid I can't do that."
      );
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
