import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { HighscoresService } from './highscores.service';
import { DiceState } from '../entities/dicestate.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

export interface Category {
  minus: number,
  mode: number
}

@Controller('highscores')
export class HighscoresController {
  constructor(private readonly highscoresService: HighscoresService) {}


  @Get()
  findAll(@Query('mode') mode: number, @Query('minus') minus: number) {
  return this.highscoresService.returnScore(minus, mode);
}
}
