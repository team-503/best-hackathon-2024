import { UrlConfig } from '@/config/url.config'
import { memo } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

type AuthLayoutProps = unknown
export const AuthLayout: React.FC<AuthLayoutProps> = memo(() => {
    const isAuth = useIsAuthenticated()

    if (!isAuth) {
        return <Navigate to={UrlConfig.login.url} />
    }

    return <Outlet />
})
AuthLayout.displayName = 'AuthLayout'
