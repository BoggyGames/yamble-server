import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { YambleService } from './yamble.service';
import { DiceState } from '../entities/dicestate.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('yamble')
export class YambleController {
  constructor(private readonly yambleService: YambleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() diceState: DiceState, @Request() req) {
    return this.yambleService.create(diceState, req.user.userId);
  }

  @Get()
  findAll() {
    return this.yambleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yambleService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(:id)
  create(@Param('id') id: string, @Request() req) {
    return this.yambleService.update(id, req.user.userId);
  }
}
