import { createUserSchema } from "./createUser.dto";
import { loginUserSchema } from "./loginUser.dto";


export class AuthDtoValidator {
    static validateLoginDto( props:unknown ) {
        return loginUserSchema.parse(props)
    }

    static validateRegisterUserDto ( props:unknown ) {
        return createUserSchema.parse(props)
    }
}