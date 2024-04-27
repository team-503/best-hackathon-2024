import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async generateJwt(id: string | number): Promise<string> {
        return this.jwtService.signAsync({
            sub: id,
        })
    }
}
