import { Router } from "express";
import { NewsRoutes } from "./news/routes";
import { AuthRoutes } from "./auth/routes";
import { UsersRoutes } from "./users/routes";
import { ResumeRoutes } from "./resume/routes";
export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        router.use('/users', UsersRoutes.routes)

        router.use('/auth', AuthRoutes.routes);

        router.use('/news', NewsRoutes.routes);

        router.use('/resume', ResumeRoutes.routes)
        return router;

    }
}