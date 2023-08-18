import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AddParticipantData, CreatePollData } from './types/types';

@Injectable()
export class PollsRepository {
  private readonly ttl: string;
  private readonly logger = new Logger(PollsRepository.name);

  constructor(configSevice: ConfigService) {
    this.ttl = configSevice.get('POLL_DURATION');
  }

  async createPoll({ votesPerVoter, topic, pollID, userID }: CreatePollData) {
    this.logger.log(`Creating new poll`);
  }

  async getPoll(pollID: string) {
    this.logger.log(`Attempting to get poll with: ${pollID}`);
  }

  async addParticipant({ pollID, userID, name }: AddParticipantData) {
    this.logger.log(
      `Attempting to add a participant with userID/name: ${userID}/${name} to pollID: ${pollID}`,
    );
  }
}
