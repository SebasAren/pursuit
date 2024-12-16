import { Test, TestingModule } from '@nestjs/testing';
import { ArxivService } from './arxiv.service';
import nock, { Scope } from 'nock';

describe('ArxivService', () => {
  let service: ArxivService;
  let arxivMock: Scope;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArxivService],
    }).compile();
    service = module.get<ArxivService>(ArxivService);

    // mock the entire arxiv api
    arxivMock = nock('http://export.arxiv.org');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a summary on call', () => {
    // mock the outgoing request
    const queryParams = new URLSearchParams({
      search_query: 'all:electron',
      start: '0',
      max_results: '10',
    });
    arxivMock.get('/api/query').query(queryParams).reply(200, {});
    expect(service.getSummary('electron')).resolves.toBe(service.summary);
  });
});
