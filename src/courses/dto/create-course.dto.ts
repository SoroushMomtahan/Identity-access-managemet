import { IsArray, IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../../users/entity/user.entity";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreateCourseDto {
  @MaxLength(50)
  @MinLength(3)
  @IsString()
  title:string;

  @IsBoolean()
  @IsOptional()
  isAccepted:boolean;

  @MinLength(10)
  @IsString()
  description:string;
}