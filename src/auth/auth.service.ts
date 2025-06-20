import { Injectable } from '@nestjs/common';
import { ProfilesService } from 'src/profiles/profiles.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: ProfilesService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
  
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) return null;
  
    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}