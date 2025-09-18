export class AppCustomError extends Error {
    private constructor(
        public readonly statusCode:number,
        public readonly title:string,
        public readonly message:string,
    ) {
        super(message)
    }

    static badRequest(message:string) {
        return new AppCustomError(400, 'Bad parameters sent', message)
    }

    static unauthorized(message:string) {
        return new AppCustomError(401, 'Not authorized', message)
    }

    static notFound(message:string) {
        return new AppCustomError(404, 'Not found element', message)
    }

    static internalServerError(message:string) {
        return new AppCustomError(500, 'Internal error', message)
    }
}