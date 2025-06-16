import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { profProviders } from './profiles.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfilesController],
  providers: [...profProviders, ProfilesService],
})
export class ProfilesModule {}
