import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entity/user.entity";
import { Comment } from "./entity/comment.entity";
import { Repository } from "typeorm";
import { Course } from "../courses/entity/course.entity";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  public async create(sub: number, createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findOneBy({ id: sub });

    const course = await this.courseRepository.findOneBy({ id: createCommentDto.courseId });
    if (!course) {
      throw new NotFoundException(`course with id #${createCommentDto.courseId} not found`);
    }

    const comment = new Comment();
    comment.user = user;
    comment.course = course;
    comment.description = createCommentDto.description;


    if (createCommentDto.parentCommentId){
      comment.comment = await this.commentRepository.findOneBy({ id: createCommentDto.parentCommentId })
    }

    return this.commentRepository.save(comment);
  }

  findOne(id: number) {
    return this.commentRepository.findOneBy({ id });
  }

  findAllBy() {
    return this.commentRepository.find({relations:{comment:true}});
  }

  removeOne(id: number) {

  }

  async updateOne(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.preload({
      id,
      ...updateCommentDto
    });
    return this.commentRepository.save(comment);
  }
}