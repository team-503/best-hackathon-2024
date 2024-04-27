import { urlConfig } from '@/config/url.config'
import { AuthLayout } from '@/layouts/auth.layout'
import { AuthPage } from '@/pages/auth/auth.page'
import { AuthLoginPage } from '@/pages/auth/login/auth-login.page'
import { AuthRegisterProvidePage } from '@/pages/auth/register/auth-register-provide.page'
import { AuthRegisterReceivePage } from '@/pages/auth/register/auth-register-receive.page'
import { MainPage } from './pages/main.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'

export interface RoutesProps {}
export const Routes: React.FC<RoutesProps> = memo(() => {
    return useRoutes([
        {
            path: urlConfig.pages.auth.url,
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
                    path: urlConfig.pages.login.url,
                    element: <AuthLoginPage />,
                },
                {
                    path: urlConfig.pages.registerRecieve.url,
                    element: <AuthRegisterReceivePage />,
                },
                {
                    path: urlConfig.pages.registerProvide.url,
                    element: <AuthRegisterProvidePage />,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
        {
            path: urlConfig.pages.main.url,
            element: <MainPage />,
        }
    ])
})
Routes.displayName = Routes.name
