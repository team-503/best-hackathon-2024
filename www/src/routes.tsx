import { urlConfig } from '@/config/url.config'
import { AuthLayout } from '@/layouts/auth.layout'
import { MainLayout } from '@/layouts/main.layout'
import { AppPage } from '@/pages/app/app.page'
import { CreatePostPage } from '@/pages/app/create-post.page'
import { PostPage } from '@/pages/app/post-page'
import { ProfileIdPage } from '@/pages/app/profile-id.page'
import { ProfileMePage } from '@/pages/app/profile-me'
import { LoginPage } from '@/pages/auth/login-page/login.page'
import { RegisterChoicePage } from '@/pages/auth/register-page/register-choice.page'
import { RegisterProvidePage } from '@/pages/auth/register-page/register-provide.page'
import { RegisterReceivePage } from '@/pages/auth/register-page/register-receive.page'
import { RegisterPage } from '@/pages/auth/register-page/register.page'
import { ErrorPage } from '@/pages/error.page'
import { MainPage } from '@/pages/main.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import { ReceivePage } from './pages/app/receive-page'
import { ProvidePage } from '@/pages/app/provide.page'

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
                            path: urlConfig.pages.app.url,
                            element: <AppPage />,
                        },
                        {
                            path: urlConfig.pages.receive.url,
                            element: <ReceivePage />,
                        },
                        {
                            path: urlConfig.pages.provide.url,
                            element: <ProvidePage />,
                        },
                        {
                            path: urlConfig.pages.createPost.url,
                            element: <CreatePostPage />,
                        },
                        {
                            path: urlConfig.pages.post.url,
                            element: <PostPage />,
                        },
                        {
                            path: urlConfig.pages.profile.me.url,
                            element: <ProfileMePage />,
                        },
                        {
                            path: urlConfig.pages.profile.id.url,
                            element: <ProfileIdPage />,
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
                    path: urlConfig.pages.error.url,
                    element: <ErrorPage />,
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
