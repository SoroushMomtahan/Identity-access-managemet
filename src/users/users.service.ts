import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Like, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { HttpService } from "@nestjs/axios";
import { UsersExchange } from "./users.exchange";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersCommunication:UsersExchange
  ) {
  }

  public async create(createUserDto: CreateUserDto) {
    const {password, ...userProperties} = createUserDto;
    const encryptedPassword = await this.usersCommunication.passwordEncryptor(password);
    const user = this.userRepository.create({password:encryptedPassword, ...userProperties});
    return this.userRepository.save(user);
  }

  public findOne(id: number) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  public findAllBy(findUserDto: FindUserDto) {
    const { username, phoneNumber, email } = findUserDto;
    return this.userRepository.findBy({
      username: username && Like(`%${username}%`),
      phoneNumber: phoneNumber && Like(`%${phoneNumber}%`),
      email: email && Like(`%${email}%`)
    });
  }

  public async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto
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

  public findOneByUsername(username: string) {
    const user = this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

}