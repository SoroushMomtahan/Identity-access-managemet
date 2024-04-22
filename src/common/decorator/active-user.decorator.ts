import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { REQUEST_USER_KEY } from "../../iam/constant/iam.constant";
import { ActiveUserDto } from "../dto/active-user.dto";

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserDto, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return field ? request[REQUEST_USER_KEY][field] : request[REQUEST_USER_KEY];
  },
);