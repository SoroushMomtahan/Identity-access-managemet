import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  PreconditionFailedException,
  UnauthorizedException
} from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { HashingService } from "../hashing/hashing.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entity/user.entity";
import { Repository } from "typeorm";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { TokenStorageService } from "./token-storage.service";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly tokenStorageService: TokenStorageService
  ) {
  }

  public async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ username: signInDto.username });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await this.hashingService.compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return this.generateToken(user.id, { email: user.email });
  }

  public async signUp(signUpDto: SignUpDto) {
    try {
      // const { password, ...userProperties } = signUpDto;
      // const encryptedPassword = await this.hashingService.hash(password);
      // const user = this.userRepository.create({ ...userProperties, password: encryptedPassword });
      // return await this.userRepository.save(user);

      const user = new User();
      user.username = signUpDto.username;
      user.email = signUpDto.password;
      user.phoneNumber = signUpDto.phoneNumber;
      user.password = await this.hashingService.hash(signUpDto.password);

      const savedUser = await this.userRepository.save(user);

      return this.generateToken(savedUser.id, { email: savedUser.email });

    } catch (e) {
      const mssqlUniqueViolationErrorCode = -268;
      if (e.code === mssqlUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw new NotAcceptableException();
    }
  }

  public signOut() {

  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken);
      const user = await this.userRepository.findOneBy({id:payload.sub});
      await this.tokenStorageService.validate(user.id, payload.tokenId);
      this.tokenStorageService.inValidate(user.id);
      return this.generateToken(user.id, {email:user.email});
    }catch (e) {
      throw new UnauthorizedException();
    }
  }

  private async generateToken(userId: number, payload: object) {
    const tokenId = crypto.randomUUID();
    this.tokenStorageService.insert(userId, tokenId);
    const accessToken = await this.jwtService.signAsync({
      sub: userId,
      ...payload
    });
    const refreshToken = await this.jwtService.signAsync({
      sub: userId,
      tokenId
    }, {
      expiresIn: this.jwtConfiguration.accessTokenExpireIn
    });
    return [
      accessToken,
      refreshToken
    ];
  }
}