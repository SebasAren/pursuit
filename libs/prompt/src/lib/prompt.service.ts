import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
  async submitToLlm(prompt: string): Promise<string> {
    // here we we would in a real scenario contact a llm API
    // for now we use a quote from 2001: A Space Oddity
    return "I'm sorry Dave, I'm afraid I can't do that.";
  }
}
