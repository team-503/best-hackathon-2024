import { urlConfig } from '@/config/url.config'
import { AuthLayout } from '@/layouts/auth.layout'
import { MainLayout } from '@/layouts/main.layout'
import ProvidePage from '@/pages/app/provide/provide.page'
import { LoginPage } from '@/pages/auth/login-page/login.page'
import { RegisterChoicePage } from '@/pages/auth/register-page/register-choice.page'
import { RegisterProvidePage } from '@/pages/auth/register-page/register-provide.page'
import { RegisterReceivePage } from '@/pages/auth/register-page/register-receive.page'
import { RegisterPage } from '@/pages/auth/register-page/register.page'
import { MainPage } from '@/pages/main.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'

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
                        {
                            path: urlConfig.pages.provide.url,
                            element: <ProvidePage />,
                        },
                    ],
                },
                // non-authenticated routes
                {
                    path: urlConfig.pages.main.url,
                    element: <MainPage />,
                },
                {
                    path: urlConfig.pages.login.url,
                    element: <LoginPage />,
                },
                {
                    path: urlConfig.pages.register.url,
                    element: <RegisterPage />,
                },
                {
                    path: urlConfig.pages.register.choice.url,
                    element: <RegisterChoicePage />,
                },
                {
                    path: urlConfig.pages.register.receive.url,
                    element: <RegisterReceivePage />,
                },
                {
                    path: urlConfig.pages.register.provide.url,
                    element: <RegisterProvidePage />,
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
