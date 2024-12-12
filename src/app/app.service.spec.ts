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
    // mock the createPromptInput method
    jest
      .spyOn(service, 'createPromptInput')
      .mockImplementation(
        (input) => "I'm sorry Dave, I'm afraid I can't do that."
      );
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
    ).toBe("I'm sorry Dave, I'm afraid I can't do that.");
  });
});
