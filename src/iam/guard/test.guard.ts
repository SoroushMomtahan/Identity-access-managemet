import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthenticationGuard } from "../authentication/authentication.guard";

export class TestGuard implements CanActivate {
  constructor(
    private readonly authenticationGuard:AuthenticationGuard
  ) {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log(this.authenticationGuard);
    console.log('iam test guard');
    return true;
  }
}