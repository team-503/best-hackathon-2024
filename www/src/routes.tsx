import { urlConfig } from '@/config/url.config'
import { AuthLayout } from '@/layouts/auth.layout'
import { MainLayout } from '@/layouts/main.layout'
import { AuthRegisterPage } from '@/pages/auth/register/auth-register.page'
import { AuthLoginPage } from '@/pages/auth/login/auth-login.page'
import { AuthRegisterProvidePage } from '@/pages/auth/register/provider/auth-register-provide.page'
import { AuthRegisterReceivePage } from '@/pages/auth/register/revceiver/auth-register-receive.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import { MainPage } from '@/pages/main.page'

export interface RoutesProps {}
export const Routes: React.FC<RoutesProps> = memo(() => {
    return useRoutes([
        {
            path: urlConfig.pages.main.url,
            element: <MainLayout />,
            children: [
                {
                    path: urlConfig.pages.app.url,
                    element: <AuthLayout />,
                    children: [
                        // authenticated routes
                    ],
                },
                // non-authenticated routes
                {
                    path: urlConfig.pages.main.url,
                    element: <MainPage />,
                },
                {
                    path: urlConfig.pages.login.url,
                    element: <AuthLoginPage />,
                },
                {
                    path: urlConfig.pages.register.url,
                    element: <AuthRegisterPage />,
                },
                {
                    path: urlConfig.pages.register.receive.url,
                    element: <AuthRegisterReceivePage />,
                },
                {
                    path: urlConfig.pages.register.provide.url,
                    element: <AuthRegisterProvidePage />,
                },
                {
                    path: '*',
                    element: <NotFoundPage />,
                },
            ],
        },
    ])
})
Routes.displayName = Routes.name
