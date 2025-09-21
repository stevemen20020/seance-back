import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppCustomError } from "../../domain/errors/AppCustom.error";
import { ErrorMessage } from "../../domain/errors/Messages.error";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UsersDatasource } from "../../domain/datasources/users/users.datasource";
import { UsersDatasourceImplementation } from "../../infrastructure/datasources/users/users.datasource.impl";
import { UsersRepository } from "../../domain/repositories/users/users.repository";
import { UsersRepositoryImplementation } from "../../infrastructure/repositories/users/users.repository.impl";

export class AuthMiddleware {

  private static userDatasource: UsersDatasource =
    new UsersDatasourceImplementation();
  private static userRepository: UsersRepository =
    new UsersRepositoryImplementation(this.userDatasource);

  static jwtMiddleware = () =>
    async (req: Request, _: Response, next: NextFunction) => {
      try {
        //Checamos si es valido el token es valido
        const authorization = req.header("Authorization");
        if (!authorization || !authorization.startsWith("Bearer"))
          throw AppCustomError.unauthorized(ErrorMessage["InvalidToken"]);

        const token = authorization.split(" ").at(1) || "";

        //Validamos si el token es correcto
        const payload = await JwtAdapter.validateToken<{ id: string }>(token);
        if (!payload)
          throw AppCustomError.unauthorized(ErrorMessage["ExpiredToken"]);

        // Verificamos si hay un usuario con el id del token que sacamos
        const user = await this.userRepository.getUserById(payload.id);

        if (!user)
          throw AppCustomError.unauthorized(ErrorMessage["InvalidToken"]);
        //Lo agregamos al body para que si en dado caso se usa

        // req.body.user = user;
        return next();
 
      } catch (error) {
        console.error(error);
        next(error);
      }
    };
}
