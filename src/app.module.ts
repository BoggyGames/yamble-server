import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { HighscoresModule } from './highscores/highscores.module';
import { DicerollsModule } from './dicerolls/dicerolls.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ProfilesModule, HighscoresModule, DicerollsModule, ConfigModule.forRoot({
    isGlobal: true, // Makes config available app-wide
  })],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
