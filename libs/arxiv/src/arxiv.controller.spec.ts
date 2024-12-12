import { Test, TestingModule } from '@nestjs/testing';
import { ArxivController } from './arxiv.controller';

describe('ArxivController', () => {
  let controller: ArxivController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArxivController],
    }).compile();

    controller = module.get<ArxivController>(ArxivController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
