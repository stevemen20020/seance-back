import { NextFunction, Response, Request } from "express";
import { NewsRepository } from "../../domain/repositories/news/news.repository";
import { NewsDtoValidator } from "../../domain/dto/news/validator.dto";
import { AppCustomError } from "../../domain/errors/AppCustom.error";
import { ErrorMessage } from "../../domain/errors/Messages.error";

export class NewsController {
    constructor(public readonly repository:NewsRepository){}

    getById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params

            if(!id) throw AppCustomError.badRequest(ErrorMessage['numberIdNotProvided'])
                
            const data = await this.repository.getNewById(id.toString())

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

            const queryParams = NewsDtoValidator.validateSearchNewsQueryParamsDto(req.query)
            
            const [data, total] = await this.repository.getNews(queryParams)

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

            const body = NewsDtoValidator.validateUpdateNewsDto(req.body)
            
            const data = await this.repository.updateNews(body, id)

            res.json({
                status:'success',
                result:data,
                message: ':)',
            })
        } catch (error) {
            next(error)
        }
    }

    create = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const body = NewsDtoValidator.validateCreateNewsDto(req.body)
            
            const data = await this.repository.createNews(body)

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
            
            const data = await this.repository.deleteNews(id)

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