import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [ProfilesModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
