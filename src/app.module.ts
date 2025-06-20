import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { HighscoresModule } from './highscores/highscores.module';
import { DicerollsModule } from './dicerolls/dicerolls.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule, ProfilesModule, HighscoresModule, DicerollsModule, ScheduleModule.forRoot(), ConfigModule.forRoot({
    isGlobal: true, // Makes config available app-wide
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
