import path from 'path';
import { env } from '../../../config/env.adapter';
import { ResumeDatasource } from '../../../domain/datasources/resume/resume.datasource';
import { SendResumeDto } from '../../../domain/dto/resume/sendResume.dto';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import { EmailService } from '../../services/emailSystem/Email.service';
import fs from 'fs'

export class ResumeDatasourceImplementation implements ResumeDatasource{

    constructor(private readonly emailService: EmailService, private companyMail:string) {
        this.companyMail = env.COMPANY_MAIL
    }

    async sendResume(dto: SendResumeDto): Promise<string> {
        const { phone, email, name, resume, message } = dto

        

        const filePath = resume ? path.join(
            __dirname,
            "../../../../public/documents/uploads/resumes",
            resume
            ) : ''        

        const attachments = resume
            ? [{ filename: resume || "document.pdf", path: filePath }]
            : [];


        const options = {
            to: this.companyMail,
            subject: "Resume sending",
            htmlBody: `<html>
            
                <span>name: ${name}</span>
                <span>email: ${email}</span>
                <span>phone: ${phone}</span>
                ${message ? `<p>${message}</p>`:''}
            
            </html>`,
            attachments: (resume && resume !== 'path undefined') ? attachments : []
        };

        const sentEmail = await this.emailService.sendEmail(options)

        if(!sentEmail) throw AppCustomError.internalServerError(ErrorMessage['EmailNotSent'])

        if(resume && resume !== 'path undefined'){
            const imagePath = path.join(
                __dirname,
                "../../../../public/documents/uploads/resumes/", // ajusta según tu estructura
                resume
            );

            try {
                if (fs.existsSync(imagePath)) {
                    await fs.promises.unlink(imagePath);
                    console.log("Curriculum eliminado:", imagePath);
                }
            } catch (err) {
                console.error("Error al eliminar el curriculum:", err);
            }
        }

        

        return 'Email sent successfully'
    }

}