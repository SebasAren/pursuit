import { IsString } from 'class-validator';

export class PromptInfoInput {
  @IsString()
  userPrompt: string;

  @IsString()
  arxivSubject: string;
}
