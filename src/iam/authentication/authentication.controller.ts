import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService:AuthenticationService) {
  }
  @Post('sign-in')
  public async signIn(@Body() signInDto:SignInDto){
    return await this.authenticationService.signIn(signInDto);
  }
  @Post('sign-up')
  public async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authenticationService.signUp(signUpDto);
  }
}