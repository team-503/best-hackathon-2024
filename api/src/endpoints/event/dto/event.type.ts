import { EventStatusEnum } from '@/endpoints/event/dto/event-status.enum'
import { PersonInput, PersonType } from '@/endpoints/event/dto/person.type'
import { Field, Float, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql'
import { IsArray, IsDateString, IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsObject, IsString } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class EventInput {
    @Field(() => EventStatusEnum)
    @IsEnum(EventStatusEnum)
    status: EventStatusEnum

    @Field(() => Float)
    @IsLatitude()
    latitude: number

    @Field(() => Float)
    @IsLongitude()
    longitude: number

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    direction: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @IsDateString()
    date: string

    @Field(() => [PersonInput], { defaultValue: [] })
    @IsArray()
    @IsObject({ each: true })
    persons: PersonInput[]
}

@InputType()
@ObjectType({ isAbstract: true })
export class EventUpdateInput extends EventInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    id: string
}

@ObjectType()
export class EventType extends OmitType(EventUpdateInput, ['persons'] as const, ObjectType) {
    @Field(() => [PersonType])
    persons: PersonType[]

    @Field(() => Int)
    disappearedQty: number

    @Field(() => String)
    createdAt: string
}
