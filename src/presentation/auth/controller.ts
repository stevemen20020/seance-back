import { NextFunction, Response, Request } from "express";
import { AuthRepository } from "../../domain/repositories/auth/auth.repository";
import { AuthDtoValidator } from "../../domain/dto/auth/validator.dto";

export class AuthController {
    constructor(public readonly repository:AuthRepository){}

    login = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const loginBody = AuthDtoValidator.validateLoginDto(req.body)

            const data = await this.repository.login(
                loginBody
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }

    register = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const registerBody = AuthDtoValidator.validateRegisterUserDto(req.body)

            const data = await this.repository.register(
                registerBody
            )

            res.json({
                status:'success',
                result:data,
                message: ':)'
            })
        } catch (error) {
            next(error)
        }
    }
}