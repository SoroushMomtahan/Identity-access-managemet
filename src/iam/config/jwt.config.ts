import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs('jwt', ()=>({
  secret:process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
  accessTokenExpireIn: process.env.JWT_REFRESH_EXPIREIN
}));