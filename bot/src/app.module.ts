import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import config from 'config'

@Module({
    imports: [
        TelegrafModule.forRoot({
            token: config.get<string>('bot.token'),
        }),
    ],
})
export class AppModule {}
