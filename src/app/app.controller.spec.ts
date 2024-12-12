import { AppController } from './app.controller';
import { TestBed } from '@suites/unit';
import { AppService } from './app.service';
import { Mocked } from '@suites/doubles.jest';

describe('AppController', () => {
  let controller: AppController;
  let appService: Mocked<AppService>;

  beforeEach(async () => {
    // mock everything except the AppController
    const { unit, unitRef } = await TestBed.solitary(AppController).compile();
    controller = unit;
    appService = unitRef.get(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the correct service method', () => {
    controller.rag({ userPrompt: 'as', arxivSubject: 'a' });
    expect(appService.createPromptInput).toHaveBeenCalledTimes(1);
  });
  it('should return the output of createPrompt immediately', () => {
    const response = 'An electron is a subatomic element.';
    appService.createPromptInput.mockImplementation(async () => response);
    expect(
      appService.createPromptInput({ arxivSubject: '', userPrompt: '' })
    ).resolves.toBe(response);
  });
});
