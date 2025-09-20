import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImplementation } from "../../infrastructure/datasources/auth/auth.datasource.impl";
import { AuthRepositoryImplementation } from "../../infrastructure/repositories/auth/auth.repository.impl";


export class AuthRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new AuthDatasourceImplementation(  )
        const repository = new AuthRepositoryImplementation( datasource )
        const controller = new AuthController( repository );

        router.post('/login',controller.login);
        router.post('/register',controller.register);

        return router
    }
}