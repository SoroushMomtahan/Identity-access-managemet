import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";

export class CreateCommentDto {
  @MinLength(3)
  @MaxLength(500)
  description:string;

  @IsNumber()
  courseId:number;

  @IsBoolean()
  @IsOptional()
  isAccepted:boolean;

  @IsOptional()
  parentCommentId:number
}