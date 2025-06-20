import { IsString, Length, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(1, 50)
  username: string;

  @IsString()
  @MaxLength(255)
  password: string;
}