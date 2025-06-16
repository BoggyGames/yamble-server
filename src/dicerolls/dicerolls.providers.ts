import { DataSource } from 'typeorm';
import { DiceRoll } from './../entities/dicerolls.entity';

export const diceProviders = [
  {
    provide: 'DICEROLL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DiceRoll),
    inject: ['DATA_SOURCE'],
  },
];