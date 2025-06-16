import { Module } from '@nestjs/common';
import { DicerollsService } from './dicerolls.service';
import { DicerollsController } from './dicerolls.controller';
import { diceProviders } from './dicerolls.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DicerollsController],
  providers: [...diceProviders, DicerollsService],
})
export class DicerollsModule {}
