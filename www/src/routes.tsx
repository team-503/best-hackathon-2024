import { UrlConfig } from '@/config/url.config'
import { AlreadyAuthLayout } from '@/layouts/already-auth.layout'
import { AuthLayout } from '@/layouts/auth.layout'
import { MainLayout } from '@/layouts/main.layout'
import { CreateEventPage } from '@/pages/app/createEvent.page'
import { HomePage } from '@/pages/app/home.page'
import { ErrorPage } from '@/pages/error.page'
import { MainPage } from '@/pages/main.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import { LoginPage } from './pages/auth/login-page/login.page'

type RoutesProps = {
    location?: Parameters<typeof useRoutes>[1]
}
export const Routes: React.FC<RoutesProps> = memo(({ location }) => {
    return useRoutes(
        [
            {
                path: UrlConfig.home.url,
                element: <MainLayout />,
                children: [
                    {
                        element: <AuthLayout />,
                        children: [
                            { path: UrlConfig.main.url, element: <HomePage /> },
                            { path: UrlConfig.createEvent.url, element: <CreateEventPage /> },
                        ],
                    },
                    {
                        path: UrlConfig.auth.url,
                        element: <AlreadyAuthLayout />,
                        children: [{ path: UrlConfig.login.url, element: <LoginPage /> }
                            // { path: UrlConfig.main.url, element: <HomePage /> },
                            // { path: UrlConfig.createEvent.url, element: <CreateEventPage /> },
                        ],
                    },
                    { path: UrlConfig.home.url, element: <MainPage /> },
                    { path: UrlConfig.error.url, element: <ErrorPage /> },
                    { path: '*', element: <NotFoundPage /> },
                ],
            },
        ],
        location,
    )
})
Routes.displayName = Routes.name
