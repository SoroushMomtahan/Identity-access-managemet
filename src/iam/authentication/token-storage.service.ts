import { OnApplicationBootstrap, OnApplicationShutdown, UnauthorizedException } from "@nestjs/common";
import Redis from "ioredis";
export class TokenStorageService implements OnApplicationBootstrap, OnApplicationShutdown{
    private redisClient: Redis
    onApplicationShutdown(signal?: string) {
        this.redisClient.quit();
    }
    onApplicationBootstrap() {
        this.redisClient = new Redis({
            host: 'localhost',
            port: 6379,
            password:"mypassword"
        });
    }
    public insert(key:number, value:string){
        this.redisClient.set(this.getKey(key), value);
    }
    public async validate(key:number, value:string){
        const realValue = await this.redisClient.get(this.getKey(key));
        if (realValue !== value){
            throw new UnauthorizedException();
        }
    }
    public inValidate(key:number){
        this.redisClient.del(this.getKey(key))
    }
    private getKey(key:number){
        return `user-${key}`;
    }

}