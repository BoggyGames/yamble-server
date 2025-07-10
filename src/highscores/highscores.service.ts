import { Injectable } from '@nestjs/common';
import { DiceState } from '../entities/dicestate.entity';

@Injectable()
export class HighscoresService {

  returnScore(diceState: DiceState) {
    //TODO: anticheat!! fiddle with the thing!!
  }

  create(diceState: DiceState, userId: number) {
    return 'This action adds a new highscore';
  }

  findAll() {
    return `This action returns all highscores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} highscore`;
  }

  /*update(id: number, updateHighscoreDto: UpdateHighscoreDto) {
    return `This action updates a #${id} highscore`;
  }

  remove(id: number) {
    return `This action removes a #${id} highscore`;
  }*/
}
