import { Module } from '@nestjs/common';
import { YambleService } from './yamble.service';
import { YambleController } from './yamble.controller';

@Module({
  controllers: [YambleController],
  providers: [YambleService],
})
export class YambleModule {}
