import { PartialType } from '@nestjs/mapped-types';
import { CreateDicerollDto } from './create-diceroll.dto';

export class UpdateDicerollDto extends PartialType(CreateDicerollDto) {}
