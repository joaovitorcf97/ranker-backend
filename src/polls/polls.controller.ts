import { Body, Controller, Logger, Post } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollsDTO } from './dto/create-poll.dto';
import { JoinPollDTO } from './dto/join-poll.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDTO: CreatePollsDTO) {
    Logger.log('In Create!');
    return createPollDTO;
  }

  @Post('/join')
  async join(@Body() JoinPollDTO: JoinPollDTO) {
    Logger.log('In jooin!');

    return JoinPollDTO;
  }

  @Post('/rejoin')
  async rejoin() {
    Logger.log('In Rejoin!');
  }
}
