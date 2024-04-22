import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Like, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { HashingService } from "../iam/hashing/hashing.service";
import { Course } from "../courses/entity/course.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    @InjectRepository(Course)
    private readonly courseRepository:Repository<Course>
  ) {
  }

  public async create(createUserDto: CreateUserDto) {
    const { password, ...userProperties } = createUserDto;
    const encryptedPassword = await this.hashingService.hash(password);
    const user = this.userRepository.create({ password: encryptedPassword, ...userProperties });
    return this.userRepository.save(user);
  }

  public findOne(id: number) {
    const user = this.userRepository.findOne({
      where: { id },
      relations: { courses: true }
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  public findAllBy(findUserDto: FindUserDto) {
    const { username, phoneNumber, email } = findUserDto;
    return this.userRepository.find({
      where: {
        username: username && Like(`%${username}%`),
        phoneNumber: phoneNumber && Like(`%${phoneNumber}%`),
        email: email && Like(`%${email}%`)
      },
      relations: { courses: true }
    });
  }

  public async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const {courses, ...other} = updateUserDto;
    const newCourses = this.courseRepository.create(courses);
    await this.courseRepository.save(newCourses);

    const currentUser = await this.findOne(id);
    const user = await this.userRepository.preload({
      id,
      courses: [...currentUser.courses, ...newCourses],
      ...other
    });
    if (!user) {
      throw new ConflictException();
    }
    return this.userRepository.save(user);
  }

  public async removeOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return this.userRepository.remove(user);
  }

}