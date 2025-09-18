import { searchUsersQueryParamsSchema } from "./searchUsers.dto"
import { updateUserSchema } from "./updateUsers.dto"


export class UsersDtoValidator {
    static validateSearchUsersQueryParamsDto ( props:unknown ) {
        return searchUsersQueryParamsSchema.parse(props)
    }

    static validateUpdateUsersDto ( props: unknown ) {
        return updateUserSchema.parse(props)
    }
}