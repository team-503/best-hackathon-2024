import { CursorConnectionArg } from '@/common/cursor-connection.arg'
import { IsSuccessType } from '@/common/is-success.type'
import { DbService } from '@/db/db.service'
import { AuthResponseType } from '@/graphql/user/dto/independent/auth-response.type'
import { LoginInput } from '@/graphql/user/dto/dependent/login.input'
import { RegisterInput } from '@/graphql/user/dto/dependent/register.input'
import { UserConnection } from '@/graphql/user/dto/dependent/user-connection.type'
import { UserIdArg } from '@/graphql/user/dto/independent/user-id.arg'
import { UserType } from '@/graphql/user/dto/independent/user.type'
import { USER_AGE_RANGE } from '@/graphql/user/user.constants'
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import config from 'config'

@Injectable()
export class UserService {
    constructor(
        private readonly dbService: DbService,
        private readonly jwtService: JwtService,
    ) {}

    // query

    async getUserConnection(args: CursorConnectionArg, currentUser: UserType): Promise<UserConnection> {
        const matchingUsers = await this.dbService.users.query(ref => {
            let query = ref
                .where('age', '>=', currentUser.age - USER_AGE_RANGE)
                .where('age', '<=', currentUser.age + USER_AGE_RANGE)
                .limit(args.limit)

            // TODO: Filter by interests
            // .where('interests', 'array-contains-any', currentUser.interests)

            // TODO: Filter by userInteractions
            // if (currentUser.userInteractions.length > 0) {
            //     query = query.where('userInteractions', 'not-in', currentUser.userInteractions)
            // }

            if (args.nextPageCursor != null) {
                query = query.offset(args.nextPageCursor)
            }
            return query
        })
        return {
            nodes: matchingUsers.filter(user => user.id !== currentUser.id),
            pageInfo: {
                limit: args.limit,
                nextPageCursor: (args.nextPageCursor || 0) + args.limit,
            },
        }
    }

    async profile(currentUser: UserType): Promise<UserType> {
        return currentUser
    }

    // mutation

    async login(data: LoginInput): Promise<AuthResponseType> {
        const users = await this.dbService.users.query(ref => ref.where('email', '==', data.email))
        const user = users?.[0]
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const passwordMatch = await bcrypt.compare(data.password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid password')
        }
        const token = await this.generateJwt(user)
        return {
            token,
        }
    }

    async register(data: RegisterInput): Promise<AuthResponseType> {
        const users = await this.dbService.users.query(ref => ref.where('email', '==', data.email))
        if (users.length > 0) {
            throw new ConflictException('User already exists')
        }
        const saltOrRounds = config.get<number>('auth.saltOrRounds')
        const hash = await bcrypt.hash(data.password, saltOrRounds)
        const user = await this.dbService.users.create({
            ...data,
            password: hash,
            idAdmin: false,
            userInteractions: [],
        })
        const token = await this.generateJwt(user)
        return {
            token,
        }
    }

    async likeUser(args: UserIdArg, currentUser: UserType): Promise<IsSuccessType> {
        const user = await this.dbService.users.get(args.userId)
        if (!user) {
            return { isSuccess: false, error: 'User not found' }
        }
        if (currentUser.userInteractions.includes(args.userId)) {
            return { isSuccess: true }
        }
        currentUser.userInteractions.push(args.userId)
        await this.dbService.users.update(currentUser)
        return { isSuccess: true }
    }

    async dislikeUser(args: UserIdArg, currentUser: UserType): Promise<IsSuccessType> {
        const user = await this.dbService.users.get(args.userId)
        if (!user) {
            return { isSuccess: false, error: 'User not found' }
        }
        if (!currentUser.userInteractions.includes(args.userId)) {
            return { isSuccess: true }
        }
        currentUser.userInteractions.filter(userId => userId !== args.userId)
        await this.dbService.users.update(currentUser)
        return { isSuccess: true }
    }

    // helper

    async generateJwt(user: UserType): Promise<string> {
        return this.jwtService.signAsync({
            sub: user.id,
        })
    }
}
