import { Body, Controller, Post } from "@nestjs/common";
import * as Buffer from "buffer";
import { HashingService } from "./hashing.service";

@Controller('hashing')
export class HashingController {
  constructor(private readonly hashingService:HashingService) {
  }
  @Post()
  public async hash(@Body('password') password: string){
    return await this.hashingService.hash(password);
  }
  @Post('compare')
  public async compare(@Body('password') password: string, @Body('encryptedPassword') encryptedPassword: string){
    return await this.hashingService.compare(password, encryptedPassword)
  }
}