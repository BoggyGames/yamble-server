import { PartialType } from '@nestjs/mapped-types';
import { CreateHighscoreDto } from './create-highscore.dto';

export class UpdateHighscoreDto extends PartialType(CreateHighscoreDto) {}
