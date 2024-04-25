import { urlConfig } from '@/config/url.config'
import { AuthLayout } from '@/layouts/auth.layout'
import { AuthPage } from '@/pages/auth/auth.page'
import { AuthLoginPage } from '@/pages/auth/login/auth-login.page'
import { AuthRegisterProvidePage } from '@/pages/auth/register/auth-register-provide.page'
import { AuthRegisterReceivePage } from '@/pages/auth/register/auth-register-receive.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'

export interface RoutesProps {}
export const Routes: React.FC<RoutesProps> = memo(() => {
    return useRoutes([
        {
            path: urlConfig.pages.main.url,
            element: <AuthLayout />,
            children: [
                // authenticated routes
            ],
        },
        // non-authenticated routes
        {
            path: urlConfig.pages.auth.url,
            element: <AuthPage />,
            children: [
                {
                    path: urlConfig.pages.login.relativeUrl,
                    element: <AuthLoginPage />,
                },
                {
                    path: urlConfig.pages.registerRecieve.relativeUrl,
                    element: <AuthRegisterReceivePage />,
                },
                {
                    path: urlConfig.pages.registerProvide.relativeUrl,
                    element: <AuthRegisterProvidePage />,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ])
})
Routes.displayName = Routes.name
