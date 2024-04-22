import { IsEmail, IsNumber } from "class-validator";

export class ActiveUserDto {
  @IsNumber()
  sub:number;

  @IsEmail()
  email:string;
}