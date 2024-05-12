import { DbService } from '@/db/db.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import config from 'config'
import { Request as RequestType } from 'express'
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly dbService: DbService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                ExtractJwt.fromHeader('auth'),
                JwtStrategy.extractJwtFromCookie,
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('jwt.secret'),
        })
    }

    private static extractJwtFromCookie(
        req: Parameters<JwtFromRequestFunction<RequestType>>['0'],
    ): ReturnType<JwtFromRequestFunction<RequestType>> {
        return req.cookies?.auth
    }

    async validate(payload: { sub: string; iat: number; exp: number }) {
        if (!payload.sub) {
            throw new UnauthorizedException('[Auth] Invalid token')
        }
        const user = await this.dbService.users.get(payload.sub)
        if (!user) {
            throw new UnauthorizedException('[Auth] User not found')
        }
        return user
    }
}
