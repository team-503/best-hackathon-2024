import { EventModule } from '@/endpoints/event/event.module'
import { UserModule } from '@/endpoints/user/user.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [UserModule, EventModule],
})
export class GraphQLEndpointsModule {}
