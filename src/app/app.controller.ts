import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PromptInfoInput } from './app.input';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('rag')
  rag(@Body() ragInputTdo: PromptInfoInput): Promise<string> {
    // the actual endpoint where the user submits his question and the subject
    // it's related to
    return this.appService.createPromptInput(ragInputTdo);
  }
}
