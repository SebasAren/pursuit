import { Module } from '@nestjs/common';
import { PromptModule } from '@pursuit/prompt';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ArxivModule } from '@pursuit/arxiv';

@Module({
  imports: [PromptModule, ArxivModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
