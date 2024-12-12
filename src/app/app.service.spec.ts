import { ArxivService } from '@pursuit/arxiv';
import { AppService } from './app.service';
import { PromptService } from '@pursuit/prompt';
import { Mocked, TestBed } from '@suites/unit';

describe('AppService', () => {
  const output = "I'm sorry Dave, I'm afraid I can't do that.";
  let service: AppService;
  let promptService: Mocked<PromptService>;
  let arxivService: Mocked<ArxivService>;

  beforeEach(async () => {
    const { unitRef, unit } = await TestBed.solitary(AppService).compile();
    service = unit;
    promptService = unitRef.get(PromptService);
    arxivService = unitRef.get(ArxivService);
    promptService.submitToLlm.mockImplementation(async () => output);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method to combine user input with an arxiv summary', () => {
    expect(service.createPromptInput).toBeDefined();
  });

  it('should be able to combine a user input with an arxiv summary', () => {
    expect(
      service.createPromptInput({
        arxivSubject: 'electron',
        userPrompt: 'What can you tell me about electrons?',
      })
    ).resolves.toBe("I'm sorry Dave, I'm afraid I can't do that.");
  });
  it('should get the summary from arxiv and submit it to the llm', async () => {
    await service.createPromptInput({ userPrompt: '', arxivSubject: '' });
    expect(arxivService.getSummary).toHaveBeenCalledTimes(1);
    expect(promptService.submitToLlm).toHaveBeenCalledTimes(1);
  });
});
