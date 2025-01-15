import { Injectable } from "@nestjs/common";
import { User } from "src/db/model/user.entity";
import { UserDto } from "src/rest/dto/user-dto";

@Injectable()
export class UserMapper {
    toDto(entity: User): UserDto {
        return {
            name: entity.name,
        };
    }

    toDtos(entities: User[]): UserDto[] {
        return entities.map(entity => this.toDto(entity));
    }
}