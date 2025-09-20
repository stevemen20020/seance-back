import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import { UsersEntity } from '../../../domain/entities';
import { UsersDatasource } from '../../../domain/datasources/users/users.datasource';
import { SearchUserQueryParamsDto } from '../../../domain/dto/users/searchUsers.dto';
import { UpdateUserDto } from '../../../domain/dto/users/updateUsers.dto';
import UsersMapper from '../../../domain/mappres/users/users.mapper';
import { bcryptAdapter } from '../../../config/bycript.adapter';

export class UsersDatasourceImplementation implements UsersDatasource{
    async getUserById(id: string): Promise<UsersEntity> {
        const numericId = Number(id);

        if (Number.isNaN(numericId)) {
            throw AppCustomError.badRequest(ErrorMessage['numberIdNotProvided'])
        }

        const existingUser = await prisma.users.findUnique({where:{id:Number(id)}})

        if(!existingUser) throw AppCustomError.badRequest(ErrorMessage['notFound'])
        
        const usersEntity = UsersMapper.prismaToEntity(existingUser)

        return usersEntity
    }
    async getUsers(params: SearchUserQueryParamsDto): Promise<[UsersEntity[], number]> {
        const { email } = params;

        const totalFound = prisma.users.count({
            where: {
                ...(email && { email }),
            }
        });

        const usersFound = prisma.users.findMany({
             where: {
                ...(email && { email }),
            },
        })

        const [total, users] = await Promise.all([totalFound, usersFound])

        const usersEntity = users.map((element) => UsersMapper.prismaToEntity(element))
        return [usersEntity, total]
    }
    async updateUser(dto: UpdateUserDto, id: string): Promise<UsersEntity> {
        const existingUser = await prisma.users.findFirst({ where: { id: Number(id) } });

        if (!existingUser) throw AppCustomError.badRequest(ErrorMessage['notFound']);

        const data: any = {};
        if (dto.email !== undefined) data.email = dto.email;
        if (dto.password !== undefined) {
            data.password = bcryptAdapter.hash(dto.password)
        }

        const updatedUser = await prisma.users.update({
            where: { id: Number(id) },
            data,
        });

        return UsersMapper.prismaToEntity(updatedUser)
    }
    async deleteUser(id: string): Promise<string> {
        const existingUser = await prisma.users.findFirst({ where: { id: Number(id) } });

        if (!existingUser) throw AppCustomError.badRequest(ErrorMessage['notFound']);

        await prisma.users.delete({where:{id:Number(id)}})

        return 'User deleted successfully'
    }
}