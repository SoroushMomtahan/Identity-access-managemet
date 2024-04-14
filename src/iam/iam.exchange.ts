import { Injectable, NotFoundException } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { HttpService } from "@nestjs/axios";
import { SignUpDto } from "./authentication/dto/sign-up.dto";

@Injectable()
export class IamExchange {
  constructor(private readonly httpService:HttpService) {
  }
  public async createUser(signUpDto:SignUpDto){
    const response = await this.httpService.axiosRef.post('http://localhost:3000/users', {...signUpDto});
    return response.data;
  }
  public async findAllUsers(){
    // const user = await this.httpService.axiosRef.get("http://localhost:3000/users");
    // if (!user.data){
    //   throw new NotFoundException();
    // }
    // return user.data

    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/users`).pipe(
        catchError((error: AxiosError) => {
          throw new NotFoundException();
        })
      )
    );
    return data
  }
}