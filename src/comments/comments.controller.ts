import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ActiveUser } from "../common/decorator/active-user.decorator";
import { ActiveUserDto } from "../common/dto/active-user.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Post()
  public create(@ActiveUser('sub') sub: number, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(sub, createCommentDto);
  }

  @Get(":id")
  public findOne(@Param("id") id: number) {
    return this.commentsService.findOne(id);
  }

  @Get()
  public findAllBy() {
    return this.commentsService.findAllBy();
  }

  @Patch(":id")
  public updateOne(@Param("id", ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateOne(id, updateCommentDto);
  }

  @Delete(":id")
  public removeOne(@Param(":id") id: number) {
    return this.commentsService.removeOne(id);
  }
}