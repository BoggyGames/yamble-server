import { Inject, Injectable } from '@nestjs/common';
import { DiceRoll } from 'src/entities/dicerolls.entity';
import { Repository } from 'typeorm';
import { UpdateDiceRollDto } from './dto/update-diceroll.dto';
import { Logger } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DicerollsService {
  private readonly logger = new Logger(DicerollsService.name);

  constructor(
    @Inject('DICEROLL_REPOSITORY')
    private diceRepository: Repository<DiceRoll>,
  ) {}

  create() {
    return 'Hah! Nope.';
  }

  todaysDate() {
    const zone = 'Europe/Belgrade';

    const dt = DateTime.now().setZone(zone).startOf('day');

    return dt.toJSDate();
  }

  findToday() {
    //return `This action returns a #${id} diceroll`;
    const dateObj = this.todaysDate();

    return this.diceRepository.findOneBy({ rollDate: dateObj })
  }

  /*async findAll(): Promise<DiceRoll[]> {
    this.logger.log("findAll called!");
    return this.diceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} diceroll`;
  }*/

  update() {
    return `Hah! Nope.`;
  }

  remove(id: number) {
    return `Hah! Nope.`;
  }

  @Cron('0 0 * * *', {
    timeZone: 'Europe/Belgrade',
  })
  handleMidnightTask() {
    this.logger.log('Midnight! Time to award badges!');
    // your logic here
  }

  //TODO:

  /*

  ROLLS:
  -Grab today's rolls (done!)
  -Grab past rolls, by date
  -Set score winner

  PROFILE:
  -Create profile (should also give back authy auth) (done, pozovi auth/login kad je uspešno i lagan si, 2 calls nije strašno)
  -Update profile (subtypes: give badge, boost win count from submit, etc)
  -See profile based on username (done!)

  AUTH:
  -Recognize jwt (done!)
  -Return profile (or just username idk) based on jwt (done!)
  -Just, like... make it work in general, idk, noćna mora (done!)

  HIGHSCORES:
  -Check for cheating and then submit score if logged in
  -Get leaderboard for set mode (maybe top 100?)

  */
}
