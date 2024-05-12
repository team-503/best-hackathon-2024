import { AuthService } from '@/auth/auth.service'
import { DbService } from '@/db/db.service'
import { UserResolver } from '@/endpoints/user/user.resolver'
import { UserService } from '@/endpoints/user/user.service'
import { Module } from '@nestjs/common'

@Module({
    providers: [UserResolver, UserService, DbService, AuthService],
})
export class UserModule {}
