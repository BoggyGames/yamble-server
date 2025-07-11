import { Inject, Injectable } from '@nestjs/common';
import { Highscore } from 'src/entities/highscores.entity';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';

@Injectable()
export class HighscoresService {

  constructor(
    @Inject('HIGHSCORE_REPOSITORY')
    private scoreRepository: Repository<Highscore>,
  ) {}

  returnScore(minus: number, mode: number) {
    //luxon it up
    const zone = 'Europe/Belgrade';
    const thatDay = DateTime.now()
      .setZone(zone)
      .minus({ days: minus })
      .startOf('day')
      .toJSDate();

    return this.findTopScores(thatDay, mode);

  }

  async create(score: number, now: Date, userId: number, mode: number) {
    const newHighscore = this.scoreRepository.create({
      score,
      submitDate: now,
      profileId: userId,
      mode,
    });
  
    return await this.scoreRepository.save(newHighscore);
  }

  async findSingle(now: Date, userId: number, mode: number) {
    return await this.scoreRepository.findOneBy({
      submitDate: now,
      profileId: userId,
      mode: mode,
    });
  }

  findTopScores(date: Date, mode: number) {
    return this.scoreRepository.find({
      where: { submitDate: date, mode: mode },
      order: { score: 'DESC', profile: { id: 'ASC' } },
      take: 100,
      relations: ['profile'],
    });
  }

  /*update(id: number, updateHighscoreDto: UpdateHighscoreDto) {
    return `This action updates a #${id} highscore`;
  }

  remove(id: number) {
    return `This action removes a #${id} highscore`;
  }*/
}
