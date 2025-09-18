import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').default(3000).asPortNumber(),
    JWT_SEED: get('JWT_SEED').default('seance@2025.').asString()
}