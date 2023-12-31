import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { PollsRepository } from './polls.repository';
import { jwtModule } from 'src/module.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PollsGateway } from './polls.gateway';

@Module({
  imports: [ConfigModule, jwtModule, PrismaModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository, PollsGateway],
})
export class PollsModule {}
