import express, { json, urlencoded } from "express";
import cors from "cors";
import { AppRoutes } from "./routes";
import { exceptionMiddleware } from "./middleware/exception.middleware";
// import { AppRoutes } from "./routes";

// import { exceptionMiddleware } from "./middlewares";

interface Props {
  port: number;
}

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor({ port }: Props) {
    this.port = port;
  }

  start() {
    /* Initial config */

    this.app.use(
      cors({
        origin: "*",
        methods: "*",
        allowedHeaders: ["*", "Authorization", "x-branch-id", "branch_id"],
      })
    );
    this.app.use(express.json());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    /* Routes */
    //this.app.use("/character-image", express.static("./public/characters"));

    
    this.app.use(AppRoutes.routes);

    /* Middlewares */
    this.app.use(exceptionMiddleware);

    /* Start */
    this.app.listen(this.port);

    console.log("El servidor ha iniciado en el puerto " + this.port);
  }
}
