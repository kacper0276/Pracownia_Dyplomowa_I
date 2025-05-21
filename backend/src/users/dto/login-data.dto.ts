import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginData {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
