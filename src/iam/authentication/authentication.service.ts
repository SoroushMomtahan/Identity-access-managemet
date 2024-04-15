import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { HashingService } from "../hashing/hashing.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly hashingService:HashingService,
    ) {
  }

  public async signIn(signInDto: SignInDto) {
    console.log();
    const user = await this.userRepository.findOneBy({username:signInDto.username});
    if (!user){
      throw new UnauthorizedException();
    }
    const isMatch = await this.hashingService.compare(signInDto.password, user.password);
    if (!isMatch){
      throw new UnauthorizedException();
    }
    return user;
  }
  public async signUp(signUpDto:SignUpDto){
    const {password, ...userProperties} = signUpDto;
    const encryptedPassword = await this.hashingService.hash(password);
    const user = this.userRepository.create({...userProperties, password:encryptedPassword});
    return await this.userRepository.save(user);
  }
}