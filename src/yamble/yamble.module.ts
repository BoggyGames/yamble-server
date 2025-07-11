import { Module } from '@nestjs/common';
import { YambleService } from './yamble.service';
import { YambleController } from './yamble.controller';
import { DicerollsService } from 'src/dicerolls/dicerolls.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { HighscoresService } from 'src/highscores/highscores.service';

@Module({
  controllers: [YambleController],
  providers: [YambleService, DicerollsService, ProfilesService, HighscoresService],
})
export class YambleModule {}
