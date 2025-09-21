import { NextFunction, Response, Request } from "express";
import { ResumeRepository } from "../../domain/repositories/resume/resume.repository";
import { ResumeDtoValidator } from "../../domain/dto/resume/validator.dto";

export class ResumeController {
    constructor(public readonly repository:ResumeRepository){}

    sendResumeSchema = async (req:Request, res:Response, next:NextFunction) => {
        try {

            const resumePath = req.file ? req.file.filename : 'path undefined'

            req.body.resume = resumePath

            const body = ResumeDtoValidator.validateSendResumeDto(req.body)
                
            const data = await this.repository.sendResume(body)

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