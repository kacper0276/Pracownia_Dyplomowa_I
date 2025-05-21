import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditBio {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}
