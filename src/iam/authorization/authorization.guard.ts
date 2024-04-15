import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { Reflector } from "@nestjs/core";
import { Role } from "../../common/enum/role.enum";
import { ROLES_KEY } from "../../common/decorator/roles.decorator";
import { IS_PUBLIC_KEY } from "../../common/decorator/public.decorator";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly reflector:Reflector
    ) {
  }
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass()
      ]);
      if (isPublic){
        return true;
      }
      if (!request['user']) {
        throw new ForbiddenException();
      }
      if (!roles){
        return false;
      }
      const id = request['user'].sub;
      const user = await this.userRepository.findOneBy(id);

      return roles.some((role) => role === user.role);
    }

}