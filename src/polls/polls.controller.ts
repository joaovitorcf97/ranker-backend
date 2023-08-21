import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollsDTO } from './dto/create-poll.dto';
import { JoinPollDTO } from './dto/join-poll.dto';
import { ControllerAuthGuard } from 'src/guards/controller-auth.guard';
import { RequestWithAuth } from './types/types';

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

  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { userID, pollID, name } = request;

    const rejoinPollResponse = await this.pollsService.rejoinPoll({
      name,
      pollID,
      userID,
    });

    return {
      poll: rejoinPollResponse,
    };
  }
}
