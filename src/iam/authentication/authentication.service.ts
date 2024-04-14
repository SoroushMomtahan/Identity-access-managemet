import { Injectable, NotFoundException } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { IamExchange } from "../iam.exchange";
import { HashingService } from "../hashing/hashing.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly iamExchange:IamExchange,
    private readonly hashingService:HashingService,
    private readonly jwtService:JwtService
    ) {
  }

  public async signIn(signInDto: SignInDto) {
    const users = await this.iamExchange.findAllUsers();
    const user = users.find((user) => user.username === signInDto.username);
    if (!user){
      throw new NotFoundException();
    }
    const result = await this.hashingService.compare(signInDto.password, user.password);
    console.log(result);
    if (!result){
      throw new NotFoundException();
    }
    return user;
  }
  public async signUp(signUpDto:SignUpDto){
    const user = await this.iamExchange.createUser(signUpDto);
    if (!user){
      throw new NotFoundException();
    }
    const payload = { sub: user.id, username: user.username };
    return{
      access_token: await this.jwtService.signAsync(payload)
    }

  }
}