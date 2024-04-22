import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "../courses/entity/course.entity";

@Injectable()
export class HttpUserService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository:Repository<Course>
  ) {
  }

  findCourseById(courseId: number) {
    return this.courseRepository.findOne({
      where:{
        id:courseId
      },
      relations:{
        comments:true,
      }
    });
  }

  findAllCourses() {
    return this.courseRepository.find({
      where:{
        isAccepted:true
      },
      relations:{
        comments:true
      }
    });
  }
}