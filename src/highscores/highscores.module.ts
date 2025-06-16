import { Module } from '@nestjs/common';
import { HighscoresService } from './highscores.service';
import { HighscoresController } from './highscores.controller';

@Module({
  controllers: [HighscoresController],
  providers: [HighscoresService],
})
export class HighscoresModule {}
