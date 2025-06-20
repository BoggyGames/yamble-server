import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiceRoll } from 'src/entities/dicerolls.entity';
import { DicerollsService } from './dicerolls.service';

@Controller('dicerolls')
export class DicerollsController {
  constructor(private readonly dicerollsService: DicerollsService) {}

  @Post()
  create() {
    return this.dicerollsService.create();
  }

  /*@Get()
  findAll() {
    return this.dicerollsService.findAll();
  }*/

  @Get()
  findToday() {
    return this.dicerollsService.findToday();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.dicerollsService.findOne(+id);
  }*/

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.dicerollsService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dicerollsService.remove(+id);
  }
}
