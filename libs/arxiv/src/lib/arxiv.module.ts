import { Module } from '@nestjs/common';
import { ArxivService } from './arxiv.service';

@Module({
  controllers: [],
  providers: [ArxivService],
  exports: [ArxivService],
})
export class ArxivModule {}
