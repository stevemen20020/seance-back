import nodemailer, { Transporter } from 'nodemailer';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter: Transporter;
    private sender: string;

    constructor(
        mailerHost: string,
        mailerEmail: string,
        senderEmailPassword: string
    ) {
        this.sender = mailerEmail;
        
        this.transporter = nodemailer.createTransport( {
            host: mailerHost,
            port: 587, //465
            secure: false,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword,
            },
        });

    }


    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail( {
                to: to,
                from: this.sender,
                subject: subject,
                html: htmlBody,
                attachments,
            });

            return true;
        } catch ( error ) {
            console.error(error);
            return false;
        }

    }

}