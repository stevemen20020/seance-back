import { NextFunction, Response, Request } from "express";
import { NewsRepository } from "../../domain/repositories/news/news.repository";
import { NewsDtoValidator } from "../../domain/dto/news/validator.dto";
import { AppCustomError } from "../../domain/errors/AppCustom.error";
import { ErrorMessage } from "../../domain/errors/Messages.error";
import { UsersRepository } from "../../domain/repositories/users/users.repository";
import { UsersDtoValidator } from "../../domain/dto/users/validator.dto";

export class UsersController {
    constructor(public readonly repository:UsersRepository){}

    getById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            if(!id) throw AppCustomError.badRequest(ErrorMessage['numberIdNotProvided'])
                
            const data = await this.repository.getUserById(id.toString())

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {page = 1, limit = 10} = req.query as {
                page?:string | number;
                limit?: string | number;
            }

            const queryParams = UsersDtoValidator.validateSearchUsersQueryParamsDto(req.query)
            
            const [data, total] = await this.repository.getUsers(queryParams)

            res.json({
                status:'success',
                result:data,
                message: ':)',
                total:total,
                totalPages: Math.ceil(total / +limit),
            })
        } catch (error) {
            next(error)
        }
    }

    update = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            if(!id) throw AppCustomError.badRequest(ErrorMessage['numberIdNotProvided'])

            const body = UsersDtoValidator.validateUpdateUsersDto(req.body)
            
            const data = await this.repository.updateUser(body, id)

            res.json({
                status:'success',
                result:data,
                message: ':)',
            })
        } catch (error) {
            next(error)
        }
    }

    delete = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            if(!id) throw AppCustomError.badRequest(ErrorMessage['numberIdNotProvided'])
            
            const data = await this.repository.deleteUser(id)

            res.json({
                status:'success',
                result:data,
                message: ':)',
            })
        } catch (error) {
            next(error)
        }
    }
}