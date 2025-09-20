import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { AppCustomError } from "../../domain/errors/AppCustom.error";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
export const exceptionMiddleware = async (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        let statusCode = 500;
        let message = "Server error";
        let result = error;

        if (error instanceof ZodError) {
            statusCode = 400;
            message = "Bad form request";
            result = error.flatten().fieldErrors;
        } else if (error instanceof AppCustomError) {
            statusCode = error.statusCode;
            message = error.title;
            result = error.message;
        } else if (error instanceof PrismaClientValidationError) {
            statusCode = 400;
            message = "Prisma error";
            result = error.message;
        }

        console.error("❌ Error en el servidor:", error);

        if (res.headersSent) {
            return next(error);
        }

        res.status(statusCode).json({ status: "failed", result, message });
    } catch (finalError) {
        console.error("❌ Error fatal en exceptionMiddleware:", finalError);
        res.status(500).json({
            status: "failed",
            result: "Unexpected error in error handler",
            message: "Server error",
        });
    }
};
