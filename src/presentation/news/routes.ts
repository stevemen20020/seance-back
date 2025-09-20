import { Router } from "express";
import { NewsController } from "./controller";
import { NewsDatasourceImplementation } from "../../infrastructure/datasources/news/news.datasource.impl";
import { NewsRepositoryImplementation } from "../../infrastructure/repositories/news/news.repository.impl";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { uploadMiddleware } from "../../infrastructure/fileSystem/FileStorage.service";


export class NewsRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new NewsDatasourceImplementation(  )
        const repository = new NewsRepositoryImplementation( datasource )
        const controller = new NewsController( repository );

        router.get('/:id',controller.getById);
        router.get('/',controller.getAll);
        router.post('/', AuthMiddleware.jwtMiddleware(), uploadMiddleware.single("image"), controller.create);
        router.put('/:id', AuthMiddleware.jwtMiddleware(), uploadMiddleware.single("image"), controller.update);
        router.delete('/:id', AuthMiddleware.jwtMiddleware(), controller.delete);

        return router
    }
}