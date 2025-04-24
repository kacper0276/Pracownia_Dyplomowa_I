import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterData {
  @IsEmail()
  email: string;

  @IsString()
  login: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  repeatedPassword: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
