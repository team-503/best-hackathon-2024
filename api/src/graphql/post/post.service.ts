import { CursorConnectionArg } from '@/common/cursor-connection.arg'
import { IsSuccessType } from '@/common/is-success.type'
import { UUID, UUIDArg } from '@/common/uuid'
import { DbService } from '@/db/db.service'
import { PostConnection } from '@/graphql/post/dto/dependent/post-connection.type'
import { PostUpdateInput } from '@/graphql/post/dto/dependent/post-update.type'
import { PostInput, PostType } from '@/graphql/post/dto/independent/post.type'
import { UserType } from '@/graphql/user/dto/independent/user.type'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import dayjs from 'dayjs'
import { max } from 'lodash'

@Injectable()
export class PostService {
    constructor(private readonly dbService: DbService) {}

    async postConnection(args: CursorConnectionArg, currentUser: UserType): Promise<PostConnection> {
        let offset: number = 0
        const matchingPosts = await this.dbService.posts.query(ref => {
            let query = ref.limit(args.limit).orderBy('createdAt', 'desc')
            if (args.prevPageCursor) {
                offset = max([0, args.prevPageCursor - args.limit]) || offset
                query = query.offset(offset)
            } else if (args.nextPageCursor) {
                offset = args.nextPageCursor
                query = query.offset(offset)
            }
            return query
        })
        return {
            nodes: matchingPosts,
            pageInfo: {
                limit: args.limit,
                prevPageCursor: offset,
                nextPageCursor: offset + args.limit,
                hasNextPage: matchingPosts.length === args.limit,
                hasPrevPage: offset > 0,
            },
        }
    }

    async postById(args: UUIDArg): Promise<PostType> {
        const post = await this.dbService.posts.get(args.id)
        if (!post) {
            throw new NotFoundException(`Post with id ${args.id} not found`)
        }
        return post
    }

    async createPost(post: PostInput, currentUser: UserType): Promise<PostType> {
        const fullPost: Omit<PostType, 'id'> = {
            ...post,
            authorId: currentUser.id,
            createdAt: dayjs().toISOString(),
        }
        return await this.dbService.posts.create(fullPost)
    }

    async updatePost(post: PostUpdateInput, currentUser: UserType): Promise<PostType> {
        const currentPost = await this.dbService.posts.get(post.id)
        if (!currentPost) {
            throw new NotFoundException(`Post with id ${post.id} not found`)
        }
        if (currentPost.authorId !== currentUser.id) {
            throw new ForbiddenException(`You are not the author of post with id ${post.id}`)
        }
        const updatedPost = {
            ...currentPost,
            ...post,
        }
        await this.dbService.posts.update(updatedPost)
        return updatedPost
    }

    async deletePost(id: UUID, currentUser: UserType): Promise<IsSuccessType> {
        const post = await this.dbService.posts.get(id)
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`)
        }
        if (post.authorId !== currentUser.id) {
            throw new ForbiddenException(`You are not the author of post with id ${id}`)
        }
        await this.dbService.posts.delete(id)
        return {
            isSuccess: true,
        }
    }
}
