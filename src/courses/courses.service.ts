import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entity/course.entity";
import { Repository } from "typeorm";
import { FindCourseDto } from "./dto/find-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { CreateCourseDto } from "./dto/create-course.dto";

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly courseRepository:Repository<Course>) {
  }
  public async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }
  public findOne(id:number){
    const course = this.courseRepository.findOneBy({id});
    if (!course){
      throw new NotFoundException();
    }
    return course;
  }
  public findAllBy(){
    const courses = this.courseRepository.find({
      relations:{
        users:true
      }
    });
    if (!courses){
      throw new NotFoundException();
    }
    return courses;
  }
  public async updateOne(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto
    });
    if (!course){
      throw new ConflictException();
    }
    return await this.courseRepository.save(course);
  }
  public async removeOne(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course){
      throw new NotFoundException();
    }
    return this.courseRepository.remove(course);
  }
}