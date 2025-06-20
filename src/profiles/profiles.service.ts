import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';

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

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(user: string) {
    return this.profRepository.findOneBy({ username: user });
  }

  async findOneWithoutHash(user: string) {
    const prof = await this.profRepository.findOneBy({ username: user });

    if (!prof) return null;

    const { passwordHash, ...safeProfile } = prof;
    return safeProfile;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }

  
}
