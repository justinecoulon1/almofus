import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users-service";

@Controller("/users")
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getUsers(): Array<String> {
        return this.usersService.getUsers();
    }
}
