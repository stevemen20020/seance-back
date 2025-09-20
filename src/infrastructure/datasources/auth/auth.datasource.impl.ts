import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import { AuthDatasource } from '../../../domain/datasources/auth/auth.datasource';
import { LoginUserDto } from '../../../domain/dto/auth/loginUser.dto';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { CreateUserDto } from '../../../domain/dto/auth/createUser.dto';
import { bcryptAdapter } from '../../../config/bycript.adapter';
import { UsersWithTokenEntity } from '../../../domain/entities/users/usersWithToken.entity';
import { UsersEntity } from '../../../domain/entities';
import UsersMapper from '../../../domain/mappres/users/users.mapper';

export class AuthDatasourceImplementation implements AuthDatasource{
    async login(loginUserDto:LoginUserDto): Promise<UsersWithTokenEntity> {
        const {email, password} = loginUserDto

        const existingUser = await prisma.users.findUnique({
            where:{
                email:email
            }
        })

        if (!existingUser) throw AppCustomError.notFound(ErrorMessage["emailNotFound"]);
        
        const isPasswordCorrect = bcryptAdapter.compare(password, existingUser.password);

        if(!isPasswordCorrect) throw AppCustomError.badRequest(ErrorMessage["passwordIncorrect"]);

        const token = await JwtAdapter.generateToken({
            id: existingUser.id,
        });

        if (!token) throw AppCustomError.internalServerError(ErrorMessage["jwtNoCreated"]);

        const userEntity = UsersMapper.prismaToEntity(existingUser);

        return {
            user: userEntity,
            token: token,
        };
    }

    async register (registerUserDto:CreateUserDto): Promise<UsersEntity> {
        const { password, email } = registerUserDto

        const existing_email = await prisma.users.findUnique({
            where:{email:email}
        })

        if(existing_email) throw AppCustomError.badRequest(ErrorMessage['emailRepeated'])

        const passwordHashed = bcryptAdapter.hash(password)

        const user = await prisma.users.create({
            data:{
                password:passwordHashed,
                email
            }
        })

        const userEntity = UsersMapper.prismaToEntity(user)
        return userEntity
    }
    
}