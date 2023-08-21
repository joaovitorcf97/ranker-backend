import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddParticipantData, CreatePollData } from './types/types';
import { Poll } from 'src/shared';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PollsRepository {
  private readonly ttl: string;
  private readonly logger = new Logger(PollsRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    configSevice: ConfigService,
  ) {
    this.ttl = configSevice.get('POLL_DURATION');
  }

  async createPoll({
    votesPerVoter,
    topic,
    pollID,
    userID,
    nameAdmin,
  }: CreatePollData): Promise<Poll> {
    try {
      const initialPoll = {
        id: pollID,
        topic,
        votesPerVoter,
        participants: {},
        adminID: userID,
      };

      await this.prisma.poll.create({ data: initialPoll });

      await this.prisma.participants.create({
        data: {
          id: userID,
          pollId: pollID,
          name: nameAdmin,
        },
      });

      return initialPoll;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getPoll(pollID: string, userID: string, name: string) {
    try {
      await this.prisma.participants.create({
        data: {
          id: userID,
          pollId: pollID,
          name,
        },
      });

      const currentPoll = await this.prisma.poll.findFirst({
        where: { id: pollID },
        include: { participants: true },
      });

      return currentPoll;
    } catch (e) {
      throw e;
    }
  }

  async addParticipant({ pollID, userID, name }: AddParticipantData) {
    try {
      const participant = await this.prisma.participants.findUnique({
        where: { id: userID },
      });

      return participant;
    } catch (e) {
      throw e;
    }
  }
}
