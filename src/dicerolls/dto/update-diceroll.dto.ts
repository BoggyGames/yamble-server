import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdateDiceRollDto {
  @IsOptional()
  @IsDateString()
  rollDate?: string;

  @IsOptional()
  @IsInt()
  randomSeed?: number;

  @IsOptional()
  @IsInt()
  dailyId?: number;

  @IsOptional()
  @IsInt()
  challId?: number;
}