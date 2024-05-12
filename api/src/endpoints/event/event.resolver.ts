import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CursorConnectionArgs } from '@/common/cursor-connection.args'
import { IdArgs } from '@/common/id.args'
import { EventConnectionArgs } from '@/endpoints/event/dto/event-connection.args'
import { EventConnectionType } from '@/endpoints/event/dto/event-connection.type'
import { EventInput, EventType, EventUpdateInput } from '@/endpoints/event/dto/event.type'
import { EventService } from '@/endpoints/event/event.service'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => EventType)
@UseGuards(GqlAuthGuard)
export class EventResolver {
    constructor(private eventService: EventService) {}

    @Query(() => EventConnectionType)
    eventConnection(@Args({ type: () => EventConnectionArgs }) args: EventConnectionArgs): Promise<EventConnectionType> {
        return this.eventService.eventConnection(args)
    }

    @Query(() => EventType)
    event(@Args({ type: () => IdArgs }) args: IdArgs): Promise<EventType> {
        return this.eventService.event(args)
    }

    @Mutation(() => EventType)
    createEvent(@Args({ name: 'event', type: () => EventInput }) event: EventInput): Promise<EventType> {
        return this.eventService.createEvent(event)
    }

    @Mutation(() => EventType)
    updateEvent(@Args({ name: 'event', type: () => EventUpdateInput }) event: EventUpdateInput): Promise<EventType> {
        return this.eventService.updateEvent(event)
    }
}
