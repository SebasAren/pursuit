import { Test, TestingModule } from '@nestjs/testing';
import { ArxivService } from './arxiv.service';

describe('ArxivService', () => {
  let service: ArxivService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArxivService],
    }).compile();
    // mock the getSummary to prevent outgoing http calls
    jest
      .spyOn(service, 'getSummary')
      .mockImplementation(async () => service.summary);

    service = module.get<ArxivService>(ArxivService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a summary on call', () => {
    expect(service.getSummary()).resolves.toBe(service.summary);
  });
});
