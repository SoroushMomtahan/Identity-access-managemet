import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { FindCourseDto } from "./dto/find-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {
  }

  @Post()
  public create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get(":id")
  public findOne(@Param("id", ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Get()
  public findAllBy() {
    return this.coursesService.findAllBy();
  }

  @Patch(":id")
  public updateOne(@Param("id", ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateOne(id, updateCourseDto);
  }

  @Delete(":id")
  public removeOne(@Param(":id", ParseIntPipe) id: number) {
    return this.coursesService.removeOne(id);
  }
}