import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CursorConnectionArg } from '@/common/cursor-connection.arg'
import { IsSuccessType } from '@/common/is-success.type'
import { AuthResponseType } from '@/graphql/user/dto/independent/auth-response.type'
import { LoginInput } from '@/graphql/user/dto/dependent/login.input'
import { RegisterInput } from '@/graphql/user/dto/dependent/register.input'
import { UserConnection } from '@/graphql/user/dto/dependent/user-connection.type'
import { UserIdArg } from '@/graphql/user/dto/independent/user-id.arg'
import { UserType } from '@/graphql/user/dto/independent/user.type'
import { UserService } from '@/graphql/user/user.service'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@UseGuards(GqlAuthGuard)
@Resolver(() => UserType)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserConnection)
    userConnection(
        @Args({ type: () => CursorConnectionArg }) args: CursorConnectionArg,
        @CurrentUser() currentUser: UserType,
    ): Promise<UserConnection> {
        return this.userService.getUserConnection(args, currentUser)
    }

    @Query(() => UserType)
    profile(@CurrentUser() currentUser: UserType): Promise<UserType> {
        return this.userService.profile(currentUser)
    }

    @Mutation(() => AuthResponseType)
    login(@Args('data') data: LoginInput): Promise<AuthResponseType> {
        return this.userService.login(data)
    }

    @Mutation(() => AuthResponseType)
    register(@Args('data') data: RegisterInput): Promise<AuthResponseType> {
        return this.userService.register(data)
    }

    @Mutation(() => IsSuccessType)
    likeUser(@Args({ type: () => UserIdArg }) args: UserIdArg, @CurrentUser() currentUser: UserType): Promise<IsSuccessType> {
        return this.userService.likeUser(args, currentUser)
    }

    @Mutation(() => IsSuccessType)
    dislikeUser(@Args({ type: () => UserIdArg }) args: UserIdArg, @CurrentUser() currentUser: UserType): Promise<IsSuccessType> {
        return this.userService.dislikeUser(args, currentUser)
    }
}
