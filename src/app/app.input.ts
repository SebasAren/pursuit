import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PromptInfoInput {
  @ApiProperty()
  @IsString()
  userPrompt: string;

  @ApiProperty()
  @IsString()
  arxivSubject: string;
}
