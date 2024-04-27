import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CursorConnectionArg } from '@/common/cursor-connection.arg'
import { IsSuccessType } from '@/common/is-success.type'
import { UUID, UUIDArg, UUIDObjectType } from '@/common/uuid'
import { PostConnection } from '@/graphql/post/dto/dependent/post-connection.type'
import { PostUpdateInput } from '@/graphql/post/dto/dependent/post-update.type'
import { PostInput, PostType } from '@/graphql/post/dto/independent/post.type'
import { PostService } from '@/graphql/post/post.service'
import { UserType } from '@/graphql/user/dto/independent/user.type'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@UseGuards(GqlAuthGuard)
@Resolver(() => PostType)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Query(() => PostConnection)
    postConnection(
        @Args({ type: () => CursorConnectionArg }) args: CursorConnectionArg,
        @CurrentUser() currentUser: UserType,
    ): Promise<PostConnection> {
        return this.postService.postConnection(args, currentUser)
    }

    @Query(() => PostType)
    postById(@Args({ type: () => UUIDArg }) id: UUIDArg): Promise<PostType> {
        return this.postService.postById(id)
    }

    @Mutation(() => PostType)
    createPost(
        @Args({ name: 'post', type: () => PostInput }) post: PostInput,
        @CurrentUser() currentUser: UserType,
    ): Promise<PostType> {
        return this.postService.createPost(post, currentUser)
    }

    @Mutation(() => PostType)
    updatePost(
        @Args({ name: 'post', type: () => PostUpdateInput }) post: PostUpdateInput,
        @CurrentUser() currentUser: UserType,
    ): Promise<PostType> {
        return this.postService.updatePost(post, currentUser)
    }

    @Mutation(() => IsSuccessType)
    deletePost(
        @Args({ name: 'id', type: () => UUIDObjectType }) id: UUID,
        @CurrentUser() currentUser: UserType,
    ): Promise<IsSuccessType> {
        return this.postService.deletePost(id, currentUser)
    }
}
