import { AppModule } from '@/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import config from 'config'

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: '*',
    })
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )

    process.on('uncaughtException', (error, origin) => {
        console.error('uncaughtException: ', error, 'Origin:', origin)
    })
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'Reason:', reason)
    })

    const port = config.get<number>('port') || 4000
    await app.listen(port)
}
bootstrap()
