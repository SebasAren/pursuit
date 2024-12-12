import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PromptInfoInput } from './app.input';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('ragInput')
  ragInput(@Body() rageInputTdo: PromptInfoInput): Promise<string> {
    return this.appService.createPromptInput(rageInputTdo);
  }
}
