import { Test, TestingModule } from '@nestjs/testing';
import { ArxivService } from './arxiv.service';

describe('ArxivService', () => {
  let service: ArxivService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArxivService],
    }).compile();
    service = module.get<ArxivService>(ArxivService);

    // mock the getSummary to prevent outgoing http calls
    jest
      .spyOn(service, 'getSummary')
      .mockImplementation(async (subject) => service.summary);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a summary on call', () => {
    expect(service.getSummary('electron')).resolves.toBe(service.summary);
  });
});
