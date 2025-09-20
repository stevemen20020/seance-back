import { NewsEntity, UsersEntity } from "../../../domain/entities";
import { NewsRepository } from "../../../domain/repositories/news/news.repository";
import { CreateNewsDto } from "../../../domain/dto/news/createNews.dto";
import { SearchNewsQueryParamsDto } from "../../../domain/dto/news/searchNews.dto";
import { UpdateNewsDto } from "../../../domain/dto/news/updateNews.dto";
import { NewsDatasource } from "../../../domain/datasources/news/news.datasource";
import { UsersRepository } from "../../../domain/repositories/users/users.repository";
import { UsersDatasource } from "../../../domain/datasources/users/users.datasource";
import { SearchUserQueryParamsDto } from "../../../domain/dto/users/searchUsers.dto";
import { UpdateUserDto } from "../../../domain/dto/users/updateUsers.dto";


export class UsersRepositoryImplementation implements UsersRepository {

    constructor(
        private readonly datasource: UsersDatasource
    ){}
    getUserById(id: string): Promise<UsersEntity> {
        return this.datasource.getUserById(id)
    }
    getUsers(params: SearchUserQueryParamsDto): Promise<[UsersEntity[], number]> {
        return this.datasource.getUsers(params)
    }
    updateUser(dto: UpdateUserDto, id: string): Promise<UsersEntity> {
        return this.datasource.updateUser(dto, id)
    }
    deleteUser(id: string): Promise<string> {
        return this.datasource.deleteUser(id)
    }
}