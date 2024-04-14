import { HashingService } from "./hashing.service";
import { compare, genSalt, hash } from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService extends HashingService{
    compare(password: string, encryptedPassword: string): Promise<boolean> {
        return compare(password, encryptedPassword);
    }

    async hash(password: string): Promise<string> {
        const salt = await genSalt();
        return hash(password, salt);
    }
}