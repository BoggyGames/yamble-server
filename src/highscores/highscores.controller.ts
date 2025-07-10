import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { HighscoresService } from './highscores.service';
import { DiceState } from '../entities/dicestate.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('highscores')
export class HighscoresController {
  constructor(private readonly highscoresService: HighscoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() diceState: DiceState, @Request() req) {
    return this.highscoresService.create(diceState, req.user.userId);
  }

  @Get() //from today!
  findAll() {
    return this.highscoresService.findAll();
  }

  @Get(':id') //this id's gonna be a date
  findOne(@Param('id') id: string) {
    return this.highscoresService.findOne(+id);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateHighscoreDto: UpdateHighscoreDto) {
    return this.highscoresService.update(+id, updateHighscoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highscoresService.remove(+id);
  }*/
}
