import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
@Injectable()
export class UsersExchange {
  constructor(private readonly httpService:HttpService) {
  }
  public async passwordEncryptor(password:string){
    const response = await this.httpService.axiosRef.post('http://localhost:3000/hashing', {password});
    return response.data
  }
}