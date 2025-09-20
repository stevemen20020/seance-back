import { Router } from "express";
import { UsersController } from "./controller";
import { UsersDatasourceImplementation } from "../../infrastructure/datasources/users/users.datasource.impl";
import { UsersRepositoryImplementation } from "../../infrastructure/repositories/users/users.repository.impl";
import { AuthMiddleware } from "../middleware/auth.middleware";


export class UsersRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new UsersDatasourceImplementation(  )
        const repository = new UsersRepositoryImplementation( datasource )
        const controller = new UsersController( repository );

        router.get('/:id', AuthMiddleware.jwtMiddleware(), controller.getById);
        router.get('/', AuthMiddleware.jwtMiddleware(), controller.getAll);
        router.put('/:id', AuthMiddleware.jwtMiddleware(), controller.update);
        router.delete('/:id', AuthMiddleware.jwtMiddleware(), controller.delete);

        return router
    }
}