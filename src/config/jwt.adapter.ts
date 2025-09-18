import jwt from 'jsonwebtoken'
import { env } from './env.adapter';

const JWT_SEED = env.JWT_SEED

export class JwtAdapter {

    static generateToken(payload: any, duration: string | number = '30d'): Promise<string | null> {
        return new Promise(resolve => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration as any }, (error, token) => {
                if (error) return resolve(null);
                return resolve(token || null);
            });
        });
    }


    static validateToken<T>(token: string): Promise<T | null> {

        return new Promise(resolve => {

            jwt.verify(token, JWT_SEED, (error, decoded) => {
                if (error) return resolve(null);
                return resolve(decoded as T);

            })

        })

    }

}