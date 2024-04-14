import { IsEmail, IsPhoneNumber, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(20)
  username:string;

  @IsEmail()
  email:string;

  @IsPhoneNumber('IR')
  phoneNumber:string;

  @IsStrongPassword()
  password:string;
}