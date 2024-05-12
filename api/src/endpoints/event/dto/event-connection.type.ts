import { PageInfoType } from '@/common/page-info.type'
import { EventType } from '@/endpoints/event/dto/event.type'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EventConnectionType {
    @Field(() => [EventType])
    nodes: EventType[]

    @Field(() => PageInfoType)
    pageInfo: PageInfoType
}
