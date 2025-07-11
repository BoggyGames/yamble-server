import { ConflictException, Injectable } from '@nestjs/common';
import { DicerollsService } from 'src/dicerolls/dicerolls.service';
import { DiceState } from 'src/entities/dicestate.entity';
import { Profile } from 'src/entities/profile.entity';
import { HighscoresService } from 'src/highscores/highscores.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';

@Injectable()
export class YambleService {

  constructor (
    private readonly profileSvc: ProfilesService,
    private readonly scoresSvc: HighscoresService,
    private readonly rollsSvc: DicerollsService
  ) {}

  scoreRow(row: string, dice: number[]): number {
    const counts = dice.reduce((acc, d) => { acc[d] = (acc[d]||0) + 1; return acc; }, {} as Record<number,number>);
    switch (row) {
      case 'Ones': case 'Twos': case 'Threes': case 'Fours': case 'Fives': case 'Sixes': {
        const numMap: Record<string,number> = { Ones:1, Twos:2, Threes:3, Fours:4, Fives:5, Sixes:6 };
        const n = numMap[row];
  
        //alert(row);
        return (Math.min(counts[n], 5) || 0) * n;
      }
      case 'Minimum': //min
        return [...dice].sort((a,b)=>a-b).slice(0,5).reduce((s,v)=>s+v, 0);
      case 'Maximum': //max
        return [...dice].sort((a,b)=>b-a).slice(0,5).reduce((s,v)=>s+v, 0);
      case '3-of-a-Kind': //triling
          const triples = Object.entries(counts)
          .filter(([face, c]) => c >= 3)
          .map(([face]) => +face);
          if (triples.length === 0) return 0;
          const best = Math.max(...triples);
          return best * 3 + 20;
      case '4-of-a-Kind': //poker
          const quads = Object.entries(counts)
          .filter(([face, c]) => c >= 4)
          .map(([face]) => +face);
          if (quads.length === 0) return 0;
          const best2 = Math.max(...quads);
          return best2 * 4 + 40;
      case 'Full House': { //ful
        const trips = Object.entries(counts)
          .filter(([face, c]) => c >= 3)
          .map(([face]) => +face);
        if (!trips.length) return 0;
        const tripleValue = Math.max(...trips);
        const remainingCounts = { ...counts };
        remainingCounts[tripleValue] -= 3;
        const pairs = Object.entries(remainingCounts)
          .filter(([face, c]) => c >= 2)
          .map(([face]) => +face);
        if (!pairs.length) return 0;
        const pairValue = Math.max(...pairs);
        return tripleValue * 3 + pairValue * 2 + 30;
      }
      case 'Straight': { //kenta
        const uniq = Array.from(new Set(dice)).sort((a,b)=>a-b);
        const str = uniq.join('');
        const large = str.includes('12345') || str.includes('23456');
        return large ? 66 : 0;
      }
      case 'Yamb':
          const yambs = Object.entries(counts)
          .filter(([face, c]) => c >= 5)
          .map(([face]) => +face);
          if (yambs.length === 0) return 0;
          const best3 = Math.max(...yambs);
          return best3 * 5 + 50;
      
      default:
        return -1;
    }
  }

//isti splet generatora i okolnosti kao na frontend, što znači da će mož proveravamo dal je cheated il nije

  mulberry32(a: number) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }
  
  randomRoll(num: number) {
    return Math.floor(num * 6) + 1;
  }
  
  generateRolls(seed: number) {
    const getRand = this.mulberry32(seed);
    return Array.from({ length: 13 }, () => [this.randomRoll(getRand()),this.randomRoll(getRand()),this.randomRoll(getRand()),this.randomRoll(getRand()),this.randomRoll(getRand()),this.randomRoll(getRand())]);
  }

  awardBadgeString(str: string, target: number, tier: string) {
    return str.slice(0, target) + tier + str.slice(target+1, str.length);
  }

  /*

0 Daily - Nothing

1 Yamble or Nothing - a single 0 sets your total to 0 permanently

2 By the Book - input your scores only into green rows, else total is 0

3 Lambda's Trick - Sum2 is SUBTRACTED instead of added to your total

4 Pillars of Wisdom - Sum1 is added to your total one more time

5 Cheat Day - Start with an additional 3 cheats

6 The Floor Is Acid - Gaining +1 cheats from green rows decreases your total by 50

7 Fundraiser - Start with 0 cheats - green rows add +2 instead of +1

*/

totalsCount(rows: any, type: number, gamemode: number): number {
  const inputRows = ['Ones','Twos','Threes','Fours','Fives','Sixes','Minimum','Maximum','3-of-a-Kind','Straight','Full House','4-of-a-Kind','Yamb'];

  let greencount = 0;

  const cleanedRows: Record<string, number> = Object.fromEntries(
    Object.entries(rows).filter(([key]) => !key.includes('∑'))
  ) as Record<string, number>;

  for (let i = 0; i < Object.keys(cleanedRows).length; i++) {
    if (Object.keys(cleanedRows)[i] === inputRows[i]) {
      greencount++;
    }
  }

  const hasZero = Object.values(cleanedRows).some(value => value === 0);

  let greenpenalty = (gamemode === 6) ? 50 : 0;

  let set1 = (rows["Ones"] ?? 0) + (rows["Twos"] ?? 0) + (rows["Threes"] ?? 0) + (rows["Fours"] ?? 0) + (rows["Fives"] ?? 0) + (rows["Sixes"] ?? 0);
  if (set1 >= 60)
    set1 += 30;
  const set2 = (rows["Ones"] ?? 0) * ((rows["Maximum"] ?? 0) - (rows["Minimum"] ?? 0));
  const set3 = (rows["3-of-a-Kind"] ?? 0) + (rows["Straight"] ?? 0) + (rows["Full House"] ?? 0) + (rows["4-of-a-Kind"] ?? 0) + (rows["Yamb"] ?? 0)
  switch (type) {
    case 1:
      return (rows["Ones"] >= 0 || rows["Twos"] >= 0 || rows["Threes"] >= 0 || rows["Fours"] >= 0 || rows["Fives"] >= 0 || rows["Sixes"] >= 0) ? set1 : -9999;
    case 2:
      return (rows["Ones"] >= 0 && rows["Minimum"] >= 0 && rows["Maximum"] >= 0) ? set2 : -9999;
    case 3:
      return (rows["3-of-a-Kind"] >= 0 || rows["Straight"] >= 0 || rows["Full House"] >= 0 || rows["4-of-a-Kind"] >= 0 || rows["Yamb"] >= 0) ? set3 : -9999;
    case 0:
      const basevalue = ((rows["Ones"] >= 0 || rows["Twos"] >= 0 || rows["Threes"] >= 0 || rows["Fours"] >= 0 || rows["Fives"] >= 0 || rows["Sixes"] >= 0) ? (gamemode === 4 ? 2*set1 : set1) : 0)
      + ((rows["Ones"] >= 0 && rows["Minimum"] >= 0 && rows["Maximum"] >= 0) ? (gamemode === 3 ? -set2 : set2) : 0)
      + ((rows["3-of-a-Kind"] >= 0 || rows["Straight"] >= 0 || rows["Full House"] >= 0 || rows["4-of-a-Kind"] >= 0 || rows["Yamb"] >= 0) ? set3 : 0);

      return (((gamemode === 2) && (greencount < Object.keys(cleanedRows).length)) || ((gamemode === 1) && hasZero) ? 0 : basevalue - greenpenalty * greencount);
    default:
      return -1;
  }
}

  async getScore(diceState: DiceState) {
    //prvo nabavi seed ! !
    const seed = (await this.rollsSvc.findToday())!.randomSeed;

    const rolls = this.generateRolls(seed + ((diceState.gamemode === 0) ? 0 : 1));

    let cheats = (diceState.gamemode === 5) ? 7 : ((diceState.gamemode === 7) ? 0 : 4);

    //const penaltyAmount = (diceState.gamemode === 6) ? -50 : 0;

    let cheatSum = 0;

    const cheatMult = (diceState.gamemode === 7) ? 2 : 1;

    let rows : Record<string, number> = {};

    const inputRows = ['Ones','Twos','Threes','Fours','Fives','Sixes','Minimum','Maximum','3-of-a-Kind','Straight','Full House','4-of-a-Kind','Yamb'];

    const cleanedRows: Record<string, number> = Object.fromEntries(
      Object.entries(diceState.usedRows).filter(([key]) => !key.includes('∑'))
    );

    let givenRolls = diceState.rolls;

    let i = 0, j = 0;

    for (i = 0; i < 13; i++) {
      for (j = 0; j < 6; j++) {
        if (rolls[i][j] != givenRolls[i][j]) {
          cheats--;
        }
      }
      //did the user spend into negative cheats? if so, get out
      if (cheats < 0) {
        console.log("Cheats are off - negative!")
        return -9999;
      }

      //then, add cheats if it was submitted to the right column
      const newKey = Object.keys(cleanedRows)[i];

      rows = {...rows, [newKey]: this.scoreRow(newKey, givenRolls[i])};

      if (newKey === inputRows[i]) {
        cheatSum++;
        cheats += cheatMult;
      }
    }

    if (cheats != diceState.cheatLeft) {
      console.log("Cheats are off!")
      return -9999;
    }

    //ok its actual score calculation time now

    return { score: this.totalsCount(rows, 0, diceState.gamemode), cheats: cheatSum };

  }

  /*
  BADGE MAP

  0 - devbadge
  1 - supporter
  2
  3
  4
  5
  6
  7
  8
  9
  10
  11
  12 - cheat
  13 - lammy
  14 - crown
  15 - wins (1/2/3 for 5/25/100)

  */

  async create(diceState: DiceState, userId: number) {

    const score = await this.getScore(diceState);

    if (score === -9999)
      return "Nice try.";

    //okay it worked! submit it!

    const zone = 'Europe/Belgrade';

    const now = DateTime.now()
      .setZone(zone)
      .startOf('day')
      .toJSDate();
    
    const existire = await this.scoresSvc.findSingle(now, userId, (diceState.gamemode === 0 ? 0 : 1));

    if (existire) {
      throw new ConflictException('Conflict: Highscore for this date, user, and mode already exists.');
    }

    this.scoresSvc.create(score.score, now, userId, (diceState.gamemode === 0 ? 0 : 1));

    if (score.cheats === 0 && score.score >= 200) {
      await this.awardToId(userId, 12, "1");
    }

    if (score.score >= 300) {
      await this.awardWin(userId);
    }

    return 'Score successfully submitted!';
  }

  findAll() {
    return `Hah! Nope.`;
  }

  findOne(id: number) {
    return `Hah! Nope.`;
  }

  async awardToId(idAwarded: number, location: number, tier: string) {

    let pr = await this.profileSvc.findOneId(idAwarded);
    pr!.badges = this.awardBadgeString(pr!.badges, location, tier);
    await this.profileSvc.updatePr(idAwarded, pr!);

  }

  async awardWin(idAwarded: number) {

    let pr = await this.profileSvc.findOneId(idAwarded);
    pr!.wins = pr!.wins + 1;
    await this.profileSvc.updatePr(idAwarded, pr!);

  }

  //todo: add supporter badge here
  async update(param: string, attempt: number) {
    if (attempt > 1)
      return `Hah! Nope.`;
    
    const idAwarded = Number(param);

    await this.awardToId(idAwarded, 1, "1");

    return "Thank you kindly for the donation!!";

  }

  @Cron('0 0 * * *', {
    timeZone: 'Europe/Belgrade',
  })
  async handleMidnightTask() {

    const zone = 'Europe/Belgrade';

    const yesterdayStart = DateTime.now()
      .setZone(zone)
      .minus({ days: 1 })
      .startOf('day')
      .toJSDate();

    //first, grab the winners
    let dailywin = await this.scoresSvc.findTopScores(yesterdayStart, 0);
    let challwin = await this.scoresSvc.findTopScores(yesterdayStart, 1);

    await this.awardToId(dailywin[0].profileId, 14, "1");
    await this.awardToId(challwin[0].profileId, 13, "1");

    await this.rollsSvc.update(yesterdayStart, challwin[0].profile, dailywin[0].profile);
  }

  remove() {
    return `Hah! Nope.`;
  }
}
