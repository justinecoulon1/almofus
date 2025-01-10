import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers(): Array<String> {
        return ["hih", "hh", "ooo"];
    }
}