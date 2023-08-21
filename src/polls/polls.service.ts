import { Injectable } from '@nestjs/common';
import {
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './types/types';
import { createPollID, createUserID } from 'src/ids';
import { PollsRepository } from './polls.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PollsService {
  constructor(
    private readonly pollsRepository: PollsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createPoll(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      pollID,
      userID,
    });

    const signedString = this.jwtService.sign(
      {
        pollID: createdPoll.id,
        name: fields.nameAdmin,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: createdPoll,
      accessToken: signedString,
    };
  }

  async joinPoll(poll: JoinPollFields) {
    const userID = createUserID();

    const joinedPoll = await this.pollsRepository.getPoll(
      poll.pollID,
      userID,
      poll.name,
    );

    const signedString = this.jwtService.sign(
      {
        pollID: joinedPoll.id,
        name: poll.name,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: joinedPoll,
      accessToken: signedString,
    };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    const joinedPoll = await this.pollsRepository.addParticipant(fields);

    return joinedPoll;
  }
}
