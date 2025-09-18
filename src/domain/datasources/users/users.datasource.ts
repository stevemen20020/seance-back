import { SearchUserQueryParamsDto } from "../../dto/users/searchUsers.dto";
import { UpdateUserDto } from "../../dto/users/updateUsers.dto";
import { UsersEntity } from "../../entities";

export interface UsersDatasource {
    getUserById(id:string): Promise<UsersEntity>
    getUsers(params:SearchUserQueryParamsDto): Promise<[UsersEntity[], number]>
    updateUser(dto:UpdateUserDto, id:string): Promise<UsersEntity>
    deleteUser(id:string): Promise<string>
}