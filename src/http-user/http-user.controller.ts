import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Public } from "../common/decorator/public.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "../comments/entity/comment.entity";
import { Repository } from "typeorm";
import { HttpUserService } from "./http-user.service";

@Controller('http-user')
export class HttpUserController {
  constructor(
      private readonly httpUserService:HttpUserService
  ) {
  }

  @Public()
  @Get('courses')
  public findAllCourses(){
    return this.httpUserService.findAllCourses();
  }
  @Get('courses/:courseId')
  public findCourseById(@Param('courseId', ParseIntPipe) courseId:number){
    return this.httpUserService.findCourseById(courseId);
  }
}