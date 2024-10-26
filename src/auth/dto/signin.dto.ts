import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSignInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}