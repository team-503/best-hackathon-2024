import { AppModule } from '@/app.module'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import { https } from 'firebase-functions/v2'

const server = express()

export const createNestServer = async (expressInstance: typeof server) => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))
    return app.init()
}

createNestServer(server)
    .then(() => console.log('[Nest ready]'))
    .catch(err => console.error('[Nest failed]', err))

export const api = https.onRequest(
    {
        cors: true,
        enforceAppCheck: true,
        maxInstances: 10,
        timeoutSeconds: 30,
        region: 'europe-west1',
    },
    server,
)
