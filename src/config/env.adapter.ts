import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').default(3000).asPortNumber(),
    JWT_SEED: get('JWT_SEED').default('seance@2025.').asString(),
    COMPANY_MAIL: get('COMPANY_MAIL').default('seance_mail@yopmail.com').asString(),
    MAILER_HOST: get('MAILER_HOST').default('SMTP').asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').default('seance_mail@yopmail.com').asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').default('').asString()
}