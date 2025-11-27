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
        const { phone, email, name, resume, message } = dto;

        const filePath = resume
            ? path.join(__dirname, "../../../../public/documents/uploads/resumes", resume)
            : "";

        const attachments = resume
            ? [{ filename: resume || "document.pdf", path: filePath }]
            : [];

        const options = {
            to: this.companyMail,
            subject: "Resume sending",
            htmlBody: `
            <html>
                <body style="
                    font-family: Arial, sans-serif;
                    background-color: #f4f6fa;
                    padding: 20px;
                ">
                    <div style="
                    max-width: 500px;
                    margin: auto;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
                    overflow: hidden;
                    border: 1px solid #e0e6f0;
                    ">
                    
                    <!-- Header azul -->
                    <div style="
                        background: #0a2a66; /* azul oscuro */
                        color: white;
                        padding: 20px;
                        text-align: center;
                    ">
                        <h2 style="margin: 0; font-size: 22px;">
                        Nuevo mensaje desde seancecorp.com
                        </h2>
                    </div>

                    <!-- Contenido -->
                    <div style="padding: 25px; color: #1a1a1a;">

                        <p style="margin: 0 0 12px;">
                        <strong style="color: #0a2a66;">Nombre:</strong> ${name}
                        </p>

                        <p style="margin: 0 0 12px;">
                        <strong style="color: #0a2a66;">Email:</strong> ${email}
                        </p>

                        <p style="margin: 0 0 20px;">
                        <strong style="color: #0a2a66;">Teléfono:</strong> ${phone}
                        </p>

                        ${message ? `
                        <div style="
                            background: #e8effc; 
                            border-left: 4px solid #0a2a66; 
                            padding: 15px;
                            border-radius: 6px;
                            color: #0a2a66;
                        ">
                            <p style="margin: 0; white-space: pre-line;">${message}</p>
                        </div>
                        ` : ""}

                    </div>

                    <!-- Footer -->
                    <div style="
                        text-align: center;
                        font-size: 12px;
                        color: #7a7a7a;
                        padding: 15px 0;
                        background: #f0f3fa;
                    ">
                        Este mensaje fue enviado desde el formulario de contacto en https://seancecorp.com.
                    </div>

                    </div>
                </body>
            </html>

            `,
            attachments: (resume && resume !== "path undefined") ? attachments : []
        };

        try {
            const sentEmail = await this.emailService.sendEmail(options);

            if (!sentEmail) {
                throw new Error("Email service returned a falsy response");
            }

            // Eliminamos el archivo si fue enviado
            if (resume && resume !== "path undefined") {
                const imagePath = path.join(
                    __dirname,
                    "../../../../public/documents/uploads/resumes/",
                    resume
                );

                if (fs.existsSync(imagePath)) {
                    await fs.promises.unlink(imagePath);
                }
            }

            return "Email sent successfully";

        } catch (err: any) {
            console.error("Error sending email:", err);

            // 🔍 Detalle extendido para el log o para respuesta controlada
            const detailedError = {
                message: "Failed to send resume email",
                reason: err.message || "Unknown error",
                stack: err.stack,
                options, // Opcional: muestra los datos enviados
            };

            throw AppCustomError.internalServerError(JSON.stringify(detailedError, null, 2));
        }
    }


}