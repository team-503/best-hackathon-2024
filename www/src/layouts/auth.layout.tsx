import { UserType, UserTypeEnum } from '@/__generated__/graphql'
import { urlConfig } from '@/config/url.config'
import { memo } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

type AuthLayoutProps = unknown
export const AuthLayout: React.FC<AuthLayoutProps> = memo(() => {
    const isAuth = useIsAuthenticated()
    const user = useAuthUser<UserType>()

    if (!isAuth) {
        return <Navigate to={urlConfig.pages.login.url} />
    }
    if (!user) {
        return <Navigate to={urlConfig.pages.login.url} />
    }
    if (user.userType === UserTypeEnum.Unknown) {
        return <Navigate to={urlConfig.pages.register.choice.url} />
    }

    return <Outlet />
})
AuthLayout.displayName = 'AuthLayout'
