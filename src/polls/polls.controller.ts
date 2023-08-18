import { Body, Controller, Post } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollsDTO } from './dto/create-poll.dto';
import { JoinPollDTO } from './dto/join-poll.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDTO: CreatePollsDTO) {
    const result = await this.pollsService.createPoll(createPollDTO);

    return result;
  }

  @Post('/join')
  async join(@Body() joinPollDTO: JoinPollDTO) {
    const result = await this.pollsService.joinPoll(joinPollDTO);

    return result;
  }

  @Post('/rejoin')
  async rejoin() {
    const result = await this.pollsService.rejoinPoll({
      name: 'From token',
      pollID: 'Also from token',
      userID: 'Guess where this comes from?',
    });

    return result;
  }
}
