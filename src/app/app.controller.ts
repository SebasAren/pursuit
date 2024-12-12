import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PromptInfoInput } from './app.input';

@Controller('app')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  ragInput(@Body() rageInputTdo: PromptInfoInput): Promise<string> {
    return this.appService.createPromptInput(rageInputTdo);
  }
}
