import { IsString, Length } from 'class-validator';

export class JoinPollDTO {
  @IsString()
  @Length(6, 6)
  pollID: string;

  @IsString()
  @Length(1, 18)
  name: string;
}
