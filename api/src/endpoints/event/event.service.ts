import { CursorConnectionArgs } from '@/common/cursor-connection.args'
import { IdArgs } from '@/common/id.args'
import { DbService } from '@/db/db.service'
import { EventConnectionArgs } from '@/endpoints/event/dto/event-connection.args'
import { EventConnectionType } from '@/endpoints/event/dto/event-connection.type'
import { EventInput, EventType, EventUpdateInput } from '@/endpoints/event/dto/event.type'
import { connectionAgg } from '@/utils/connection-agg'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class EventService {
    constructor(private readonly dbService: DbService) {}

    async eventConnection(args: EventConnectionArgs): Promise<EventConnectionType> {
        let offset: number = 0
        const matchingPosts = await this.dbService.events.query(ref => {
            let query = ref.limit(args.limit).orderBy('createdAt', 'desc')
            if (args.nextPageCursor) {
                offset = args.nextPageCursor
                query = query.offset(offset)
            }
            if (args.eventStatus) {
                query = query.where('status', '==', args.eventStatus)
            }
            if (args.direction) {
                query = query.where('direction', '==', args.direction)
            }
            return query
        })
        return connectionAgg(matchingPosts, {
            limit: args.limit,
            nextPageCursor: offset + args.limit,
        })
    }

    async event(args: IdArgs): Promise<EventType> {
        const event = await this.dbService.events.get(args.id)
        if (!event) {
            throw new NotFoundException('Event not found')
        }
        return event
    }

    async createEvent(event: EventInput): Promise<EventType> {
        return this.dbService.events.create({
            disappearedQty: event.persons.length,
            createdAt: new Date().toISOString(),
            ...event,
        })
    }

    async updateEvent(event: EventUpdateInput): Promise<EventType> {
        const eventToUpdate = await this.dbService.events.get(event.id)
        if (!eventToUpdate) {
            throw new NotFoundException('Event not found')
        }
        await this.dbService.events.update({
            disappearedQty: event.persons.length,
            ...event,
        })
        return {
            ...eventToUpdate,
            ...event,
        }
    }
}
