import { DbService } from '@/db/db.service'
import { EventResolver } from '@/endpoints/event/event.resolver'
import { EventService } from '@/endpoints/event/event.service'
import { Module } from '@nestjs/common'

@Module({
    providers: [EventResolver, EventService, DbService],
})
export class EventModule {}
