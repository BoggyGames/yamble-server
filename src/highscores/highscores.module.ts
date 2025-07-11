import { Module } from '@nestjs/common';
import { HighscoresService } from './highscores.service';
import { HighscoresController } from './highscores.controller';
import { scoresProviders } from './highscores.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HighscoresController],
  providers: [...scoresProviders, HighscoresService],
  exports: [HighscoresService],
})
export class HighscoresModule {}
