import { Module } from '@nestjs/common';
import { ArxivModule } from '@pursuit/arxiv';

@Module({
  imports: [ArxivModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
