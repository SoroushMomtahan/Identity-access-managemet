import { IsOptional } from "class-validator";

export class FindCourseDto {
  @IsOptional()
  title:string
}