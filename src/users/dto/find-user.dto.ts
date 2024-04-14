import { IsOptional } from "class-validator";

export class FindUserDto {
  @IsOptional()
  username?:string;

  @IsOptional()
  phoneNumber?:string;

  @IsOptional()
  email?:string
}