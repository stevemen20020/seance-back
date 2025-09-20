import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";
import { CreateUserDto } from "../../../domain/dto/auth/createUser.dto";
import { LoginUserDto } from "../../../domain/dto/auth/loginUser.dto";
import { UsersEntity } from "../../../domain/entities";
import { UsersWithTokenEntity } from "../../../domain/entities/users/usersWithToken.entity";
import { AuthDatasource } from "../../../domain/datasources/auth/auth.datasource";


export class AuthRepositoryImplementation implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource
    ){}
    register(dto: CreateUserDto): Promise<UsersEntity> {
        return this.datasource.register(dto)
    }
    login(dto: LoginUserDto): Promise<UsersWithTokenEntity> {
        return this.datasource.login(dto)
    }
}