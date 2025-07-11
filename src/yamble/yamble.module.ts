import { Module } from '@nestjs/common';
import { YambleService } from './yamble.service';
import { YambleController } from './yamble.controller';
import { DicerollsModule } from 'src/dicerolls/dicerolls.module';
import { HighscoresModule } from 'src/highscores/highscores.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [DicerollsModule, HighscoresModule, ProfilesModule],
  controllers: [YambleController],
  providers: [YambleService],
})
export class YambleModule {}
