import { Header } from '@/components/header'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'

type MainLayoutProps = unknown
export const MainLayout: React.FC<MainLayoutProps> = memo(() => {
    return (
        <section className="relative flex min-h-screen flex-col">
            <Header />
            <Outlet />
        </section>
    )
})
MainLayout.displayName = 'MainLayout'
