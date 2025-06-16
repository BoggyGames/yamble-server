import { Injectable } from '@nestjs/common';
import { CreateHighscoreDto } from './dto/create-highscore.dto';
import { UpdateHighscoreDto } from './dto/update-highscore.dto';

@Injectable()
export class HighscoresService {
  create(createHighscoreDto: CreateHighscoreDto) {
    return 'This action adds a new highscore';
  }

  findAll() {
    return `This action returns all highscores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} highscore`;
  }

  update(id: number, updateHighscoreDto: UpdateHighscoreDto) {
    return `This action updates a #${id} highscore`;
  }

  remove(id: number) {
    return `This action removes a #${id} highscore`;
  }
}
