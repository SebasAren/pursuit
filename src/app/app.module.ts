import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArxivModule } from '@pursuit/arxiv';

@Module({
  imports: [ArxivModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
