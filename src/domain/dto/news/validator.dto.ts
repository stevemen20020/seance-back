import { createNewsSchema } from "./createNews.dto";
import { searchNewsQueryParamsSchema } from "./searchNews.dto";
import { updateNewsSchema } from "./updateNews.dto";


export class NewsDtoValidator {
    static validateCreateNewsDto( props:unknown ) {
        return createNewsSchema.parse(props)
    }

    static validateSearchNewsQueryParamsDto( props: unknown ) {
        return searchNewsQueryParamsSchema.parse(props)
    }

    static validateUpdateNewsDto( props: unknown ) {
        return updateNewsSchema.parse(props)
    }
}