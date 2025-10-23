import { registerEnumType } from "@nestjs/graphql";

export enum AuthRole {
    USER,
    ADMIN
}

registerEnumType(AuthRole,{
    name : 'AuthRole',
    description : 'Auth Role enum types'
})