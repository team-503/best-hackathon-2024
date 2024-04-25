import { urlConfig } from '@/config/url.config'
import { memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type AuthLayoutProps = unknown
export const AuthLayout: React.FC<AuthLayoutProps> = memo(() => {
    // refactor
    const isAuth = true

    if (!isAuth) {
        return <Navigate to={urlConfig.pages.login.url} />
    }

    return <Outlet />
})
AuthLayout.displayName = 'AuthLayout'
