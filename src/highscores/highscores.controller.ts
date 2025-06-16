import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HighscoresService } from './highscores.service';
import { CreateHighscoreDto } from './dto/create-highscore.dto';
import { UpdateHighscoreDto } from './dto/update-highscore.dto';

@Controller('highscores')
export class HighscoresController {
  constructor(private readonly highscoresService: HighscoresService) {}

  @Post()
  create(@Body() createHighscoreDto: CreateHighscoreDto) {
    return this.highscoresService.create(createHighscoreDto);
  }

  @Get()
  findAll() {
    return this.highscoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.highscoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHighscoreDto: UpdateHighscoreDto) {
    return this.highscoresService.update(+id, updateHighscoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highscoresService.remove(+id);
  }
}
