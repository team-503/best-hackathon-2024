import { UserTypeEnum } from '@/__generated__/graphql'
import { urlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { memo } from 'react'
import { Navigate } from 'react-router-dom'

type AppPageProps = unknown
export const AppPage: React.FC<AppPageProps> = memo(() => {
    const user = useUserStore(state => state.user)

    if (!user) {
        return <Navigate to={urlConfig.pages.login.url} />
    } else if (user.userType === UserTypeEnum.Unknown) {
        return <Navigate to={urlConfig.pages.register.choice.url} />
    } else if (user.userType === UserTypeEnum.Provider) {
        return <Navigate to={urlConfig.pages.provide.url} />
    } else if (user.userType === UserTypeEnum.Receiver) {
        return <Navigate to={urlConfig.pages.receive.url} />
    }

    return null
})
AppPage.displayName = 'AppPage'
