import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DicerollsService } from './dicerolls.service';
import { CreateDicerollDto } from './dto/create-diceroll.dto';
import { UpdateDicerollDto } from './dto/update-diceroll.dto';

@Controller('dicerolls')
export class DicerollsController {
  constructor(private readonly dicerollsService: DicerollsService) {}

  @Post()
  create(@Body() createDicerollDto: CreateDicerollDto) {
    return this.dicerollsService.create(createDicerollDto);
  }

  @Get()
  findAll() {
    return this.dicerollsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dicerollsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDicerollDto: UpdateDicerollDto) {
    return this.dicerollsService.update(+id, updateDicerollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dicerollsService.remove(+id);
  }
}
