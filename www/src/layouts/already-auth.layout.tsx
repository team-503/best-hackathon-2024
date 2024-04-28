import { UserTypeEnum } from '@/__generated__/graphql'
import { urlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { memo } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

type AlreadyAuthLayoutProps = unknown
export const AlreadyAuthLayout: React.FC<AlreadyAuthLayoutProps> = memo(() => {
    const isAuth = useIsAuthenticated()
    const user = useUserStore(state => state.user)

    if (isAuth && user?.userType === UserTypeEnum.Unknown) {
        return <Navigate to={urlConfig.pages.register.choice.url} />
    }
    if (!user) {
        return <Navigate to={urlConfig.pages.login.url} />
    }
    if (user.userType === UserTypeEnum.Unknown) {
        return <Navigate to={urlConfig.pages.register.choice.url} />
    }

    return <Outlet />
})
AlreadyAuthLayout.displayName = 'AlreadyAuthLayout'
