import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";
import { User } from "../../users/entity/user.entity";

export class UpdateCourseDto extends PartialType(CreateCourseDto){
  users:User[]
}