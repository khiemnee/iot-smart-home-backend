import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthType } from "./auth.type";
import { AuthService } from "./auth.service";
import { AuthInput } from "./auth.input";
import { GetUser } from "./get-user.decorator";
import { Auth } from "./auth.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./gql-auth.guard";
import { UserType } from "./user.type";


@Resolver(of => AuthType)
export class UserResolver{
    constructor(
        private authService:AuthService
    ){}

    @Query(returns => UserType)
    @UseGuards(GqlAuthGuard)
    getCurrentUser(
        @GetUser() user :Auth
    ){
        return user
    }

    @Mutation(returns => AuthType)
    registerUser(
        @Args('authInput') authInput:AuthInput
    ){
        return this.authService.registerUser(authInput)
    }

    @Mutation(returns => AuthType)
     loginUser(
        @Args('authInput') authInput:AuthInput
    ){
        return  this.authService.loginUser(authInput)
    }
}