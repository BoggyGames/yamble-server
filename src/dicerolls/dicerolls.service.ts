import { Inject, Injectable } from '@nestjs/common';
import { DiceRoll } from 'src/entities/dicerolls.entity';
import { Repository } from 'typeorm';
import { CreateDicerollDto } from './dto/create-diceroll.dto';
import { UpdateDicerollDto } from './dto/update-diceroll.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class DicerollsService {
  private readonly logger = new Logger(DicerollsService.name);

  constructor(
    @Inject('DICEROLL_REPOSITORY')
    private diceRepository: Repository<DiceRoll>,
  ) {}

  create(createDicerollDto: CreateDicerollDto) {
    return 'This action adds a new diceroll';
  }

  async findAll(): Promise<DiceRoll[]> {
    this.logger.log("findAll called!");
    return this.diceRepository.find();
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
