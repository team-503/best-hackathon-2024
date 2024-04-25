import { DbService } from '@/db/db.service'
import { UserResolver } from '@/graphql/user/user.resolver'
import { UserService } from '@/graphql/user/user.service'
import { Module } from '@nestjs/common'

@Module({
    providers: [UserResolver, UserService, DbService],
})
export class UserModule {}
