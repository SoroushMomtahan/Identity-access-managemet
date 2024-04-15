import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { Public } from "../../common/decorator/public.decorator";
import { JwtService } from "@nestjs/jwt";

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService:AuthenticationService,
    private readonly jwtService:JwtService
    ) {
  }
  @Public()
  @Post('sign-in')
  public async signIn(@Body() signInDto:SignInDto){
    const user = await this.authenticationService.signIn(signInDto);
    return this.jwtCreator({ sub: user.id, username: user.username })
  }
  @Public()
  @Post('sign-up')
  public async signUp(@Body() signUpDto: SignUpDto) {
    const user =  await this.authenticationService.signUp(signUpDto);
    return await this.jwtCreator({ sub: user.id, username: user.username });
  }
  private async jwtCreator(payload:{sub:number, username:string}){
    return{
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}