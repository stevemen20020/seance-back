import { Router } from "express";
import { ResumeController } from "./controller";
import { ResumeDatasourceImplementation } from "../../infrastructure/datasources/resume/resume.datasource.impl";
import { ResumeRepositoryImplementation } from "../../infrastructure/repositories/resume/resume.repository.impl";
import { uploadDocMiddleware } from '../../infrastructure/services/fileSystem/FileResume.service';
import { EmailService } from "../../infrastructure/services/emailSystem/Email.service";
import { env } from "../../config/env.adapter";


export class ResumeRoutes {

    static get routes() : Router {

        const router = Router();

        const emailService = new EmailService( env.MAILER_HOST, env.MAILER_EMAIL, env.MAILER_SECRET_KEY)
        const datasource = new ResumeDatasourceImplementation( emailService, env.COMPANY_MAIL )
        const repository = new ResumeRepositoryImplementation( datasource )
        const controller = new ResumeController( repository );

        router.post('/', uploadDocMiddleware.single('resume'), controller.sendResumeSchema);

        return router
    }
}