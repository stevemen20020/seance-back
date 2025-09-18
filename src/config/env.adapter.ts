import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').default(3000).asPortNumber(),
}