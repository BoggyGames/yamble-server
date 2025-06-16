import { Module } from '@nestjs/common';
import { DicerollsService } from './dicerolls.service';
import { DicerollsController } from './dicerolls.controller';

@Module({
  controllers: [DicerollsController],
  providers: [DicerollsService],
})
export class DicerollsModule {}
