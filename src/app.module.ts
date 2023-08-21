import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsModule } from './polls/polls.module';
import { jwtModule } from './module.config';

@Module({
  imports: [ConfigModule.forRoot(), PollsModule, jwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
