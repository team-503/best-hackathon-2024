import { CursorConnectionArgs } from '@/common/cursor-connection.args'
import { DirectionEnum } from '@/endpoints/event/dto/direction.enum'
import { EventStatusEnum } from '@/endpoints/event/dto/event-status.enum'
import { Maybe } from '@/utils/type-helpers'
import { ArgsType, Field } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@ArgsType()
export class EventConnectionArgs extends CursorConnectionArgs {
    @Field(() => EventStatusEnum, { nullable: true })
    @IsOptional()
    @IsEnum(EventStatusEnum)
    eventStatus?: Maybe<EventStatusEnum>

    @Field(() => DirectionEnum, { nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    direction?: Maybe<DirectionEnum>
}
