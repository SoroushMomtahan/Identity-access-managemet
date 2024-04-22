import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { Public } from "../../common/decorator/public.decorator";
import { JwtService } from "@nestjs/jwt";
import process from "process";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ActiveUser } from "../../common/decorator/active-user.decorator";

@Controller("authentication")
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {
  }

  @Public()
  @Post("sign-up")
  public async signUp(@Body() signUpDto: SignUpDto) {

    const [accessToken, refreshToken] = await this.authenticationService.signUp(signUpDto);
    return {
      accessToken,
      refreshToken
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  public async signIn(@Body() signInDto: SignInDto) {
    const [accessToken, refreshToken] = await this.authenticationService.signIn(signInDto);
    return {
      accessToken,
      refreshToken
    };
  }

  public signOut(){}
  @Public()
  @Post("refresh-token")
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const [accessToken, refreshToken] = await this.authenticationService.refreshToken(refreshTokenDto);
    return {
      accessToken,
      refreshToken
    };
  }
}