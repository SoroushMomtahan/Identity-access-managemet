import {
  IsArray,
  IsEmail, IsObject,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  MaxLength,
  MinLength,
  ValidateNested
} from "class-validator";
import { CreateCourseDto } from "../../courses/dto/create-course.dto";
import { Type } from "class-transformer";
import { Course } from "../../courses/entity/course.entity";

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber("IR")
  phoneNumber: string;

  @IsStrongPassword()
  password: string;

  @ValidateNested({ each: true })
  @Type(()=>CreateCourseDto)
  @IsOptional()
  courses: CreateCourseDto[];
}