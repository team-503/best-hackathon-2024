import { JwtStrategy } from '@/auth/strategy/jwt.strategy'
import { DbService } from '@/db/db.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import config from 'config'

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            global: true,
            secret: config.get<string>('jwt.secret'),
            signOptions: {
                expiresIn: '21d',
            },
        }),
    ],
    providers: [JwtStrategy, DbService],
})
export class AuthModule {}
