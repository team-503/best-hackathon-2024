import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { LoginInput } from '@/graphql/user/dto/dependent/login.input'
import { RegisterInput } from '@/graphql/user/dto/dependent/register.input'
import { AuthResponseType } from '@/graphql/user/dto/independent/auth-response.type'
import { UserType } from '@/graphql/user/dto/independent/user.type'
import { UserService } from '@/graphql/user/user.service'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => UserType)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => UserType)
    me(@CurrentUser() currentUser: UserType): Promise<UserType> {
        return this.userService.me(currentUser)
    }

    @Query(() => UserType)
    profile(@Args({ name: 'id', type: () => String }) id: string): Promise<UserType> {
        return this.userService.profile(id)
    }

    @Mutation(() => AuthResponseType)
    login(@Args({ name: 'user', type: () => LoginInput }) userData: LoginInput): Promise<AuthResponseType> {
        return this.userService.login(userData)
    }

    @Mutation(() => AuthResponseType)
    register(@Args({ name: 'user', type: () => RegisterInput }) userData: RegisterInput): Promise<AuthResponseType> {
        return this.userService.register(userData)
    }
}
