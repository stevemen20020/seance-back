import { CreateUserDto } from "../../dto/auth/createUser.dto";
import { LoginUserDto } from "../../dto/auth/loginUser.dto";
import { UsersEntity } from "../../entities";
import { UsersWithTokenEntity } from "../../entities/users/usersWithToken.entity";

export interface AuthDatasource {
    register(dto: CreateUserDto):Promise <UsersEntity>
    login(dto: LoginUserDto): Promise<UsersWithTokenEntity>
}