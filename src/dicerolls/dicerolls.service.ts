import { Injectable } from '@nestjs/common';
import { CreateDicerollDto } from './dto/create-diceroll.dto';
import { UpdateDicerollDto } from './dto/update-diceroll.dto';

@Injectable()
export class DicerollsService {
  create(createDicerollDto: CreateDicerollDto) {
    return 'This action adds a new diceroll';
  }

  findAll() {
    return `This action returns all dicerolls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diceroll`;
  }

  update(id: number, updateDicerollDto: UpdateDicerollDto) {
    return `This action updates a #${id} diceroll`;
  }

  remove(id: number) {
    return `This action removes a #${id} diceroll`;
  }
}
