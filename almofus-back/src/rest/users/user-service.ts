import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getUsers(): Array<String> {
        return ["hih", "hh", "ooo"];
    }
}