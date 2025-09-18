import { UsersEntity } from "./users.entity";

export interface UsersWithTokenEntity {
    user:UsersEntity,
    token:string
}