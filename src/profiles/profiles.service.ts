import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { profanity, CensorType } from '@2toad/profanity';

@Injectable()
export class ProfilesService {

  constructor(
    @Inject('PROFILE_REPOSITORY')
    private profRepository: Repository<Profile>,
  ) {}

  todaysDate() {
    const zone = 'Europe/Belgrade';

    const dt = DateTime.now().setZone(zone).startOf('day');

    return dt.toJSDate();
  }

  async createProfile(dto: CreateProfileDto): Promise<Profile> {

    const existing = await this.profRepository.findOneBy({ username: dto.username });
    if (existing) {
      throw new ConflictException('Username already exists');
    }

    const userregex = /^(?![_ -])(?:(?![_ -]{2})[\w -]){5,16}(?<![_ -])$/u;
    const passregex = /^(?:(?=.*?\p{N})(?=.*?[\p{S}\p{P} ])(?=.*?\p{Lu})(?=.*?\p{Ll}))[^\p{C}]{8,16}$/u;

    if (!userregex.test(dto.username)) {
      throw new ConflictException('Invalid username: must be 5-16 chars, no leading/trailing/duplicate dashes/underscores.');
    }
    if (!passregex.test(dto.password)) {
      throw new ConflictException('Invalid password: must be 8-16 chars, with upper/lowercase, digit, symbol, no control chars.');
    }

    if (profanity.exists(dto.username)) {
      throw new ConflictException('...try a different name?');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const isAdmin = dto.username === "Boggy";
    const isLambda = dto.username === "Lambda";

    const profile = this.profRepository.create({
      username: dto.username,
      passwordHash,
      wins: (isLambda ? 123456 : 0),
      badges: ((isAdmin || isLambda) ? "1" : "0") + '0'.repeat(15), // 16-char zero string
      created: this.todaysDate(), // today
    });

    return this.profRepository.save(profile);
  }

  findOne(user: string) {
    return this.profRepository.findOne({where: {username: user}, select: ['id', 'username', 'passwordHash', 'badges', 'created', 'wins'] });
  }

  findOneId(userId: number) {
    return this.profRepository.findOne({where: { id: userId }, select: ['id', 'username', 'badges', 'created', 'wins'] });
  }

  async findOneWithoutHash(user: string) {
    const prof = await this.profRepository.findOneBy({ username: user });

    if (!prof) return null;

    const { passwordHash, ...safeProfile } = prof;
    return safeProfile;
  }

  async updatePr(id: number, pr: Profile) {
    await this.profRepository.update(id, { wins: pr.wins, badges: pr.badges });
  }
  
}
