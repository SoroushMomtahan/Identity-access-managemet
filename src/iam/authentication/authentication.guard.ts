import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../../common/decorator/public.decorator";
import { JwtService } from "@nestjs/jwt";
import { REQUEST_USER_KEY } from "../constant/iam.constant";
import { TestGuard } from "../guard/test.guard";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService:JwtService,
    // private readonly testGuard:TestGuard
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log(this.testGuard);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request[REQUEST_USER_KEY] = await this.jwtService.verifyAsync(token);
    }catch (e){
      throw new UnauthorizedException();
    }
    return request[REQUEST_USER_KEY].email;

  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

}