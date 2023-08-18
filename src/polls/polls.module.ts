import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { RedisModule } from 'src/redis.module';

@Module({
  imports: [ConfigModule, RedisModule],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [],
})
export class PollsModule {}
