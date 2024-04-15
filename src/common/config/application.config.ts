import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs('application',()=>({
  app:{
    host:process.env.APP_HOST,
    port:process.env.APP_PORT,
    protocol:process.env.APP_PROTOCOL
  }
}));