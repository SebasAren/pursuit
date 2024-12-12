import { Module } from '@nestjs/common';
import { PromptModule } from '@pursuit/prompt';

@Module({
  imports: [PromptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
