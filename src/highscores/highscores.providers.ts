import { DataSource } from 'typeorm';
import { Highscore } from './../entities/highscores.entity';

export const scoresProviders = [
  {
    provide: 'HIGHSCORE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Highscore),
    inject: ['DATA_SOURCE'],
  },
];