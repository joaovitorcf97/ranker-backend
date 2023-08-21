import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreatePollsDTO {
  @IsString()
  @Length(1, 100)
  topic: string;

  @IsInt()
  @Min(1)
  @Max(5)
  votesPerVoter: number;

  @IsString()
  @Length(1, 25)
  nameAdmin: string;
}
