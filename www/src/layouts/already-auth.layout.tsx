import { UrlConfig } from '@/config/url.config'
import { memo } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

type AlreadyAuthLayoutProps = unknown
export const AlreadyAuthLayout: React.FC<AlreadyAuthLayoutProps> = memo(() => {
    const isAuth = useIsAuthenticated()

    if (isAuth) {
        return <Navigate to={UrlConfig.app.url} />
    }

    return <Outlet />
})
AlreadyAuthLayout.displayName = 'AlreadyAuthLayout'
