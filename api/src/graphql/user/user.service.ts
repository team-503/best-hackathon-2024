import { AuthService } from '@/auth/auth.service'
import { DbService } from '@/db/db.service'
import { LoginInput } from '@/graphql/user/dto/dependent/login.input'
import { RegisterInput } from '@/graphql/user/dto/dependent/register.input'
import { AuthResponseType } from '@/graphql/user/dto/independent/auth-response.type'
import { UserPartialInput, UserType } from '@/graphql/user/dto/independent/user.type'
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import bcrypt from 'bcrypt'
import config from 'config'
import { merge } from 'lodash'

@Injectable()
export class UserService {
    constructor(
        private readonly dbService: DbService,
        private readonly authService: AuthService,
    ) {}

    async me(currentUser: UserType): Promise<UserType> {
        return currentUser
    }

    async profile(id: string): Promise<UserType> {
        const user = await this.dbService.users.get(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async login(userData: LoginInput): Promise<AuthResponseType> {
        const users = await this.dbService.users.query(ref => ref.where('email', '==', userData.email))
        const user = users?.[0]
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const passwordMatch = await bcrypt.compare(userData.password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid password')
        }
        const token = await this.authService.generateJwt(user.id)
        return {
            token,
            user,
        }
    }

    async register(userData: RegisterInput): Promise<AuthResponseType> {
        const users = await this.dbService.users.query(ref => ref.where('email', '==', userData.email))
        if (users.length > 0) {
            throw new ConflictException('User already exists')
        }
        const saltOrRounds = config.get<number>('auth.saltOrRounds')
        const hash = await bcrypt.hash(userData.password, saltOrRounds)
        const user = await this.dbService.users.create({
            ...userData,
            password: hash,
        })
        const token = await this.authService.generateJwt(user.id)
        return {
            token,
            user,
        }
    }

    async updateProfile(userData: UserPartialInput, currentUser: UserType): Promise<UserType> {
        const newUser = merge(currentUser, userData)
        await this.dbService.users.update(newUser)
        return newUser
    }
}
