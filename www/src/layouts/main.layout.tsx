import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'

type MainLayoutProps = unknown
export const MainLayout: React.FC<MainLayoutProps> = memo(() => {
    return (
        <section className="flex h-screen flex-col">
            <Header />
            <Outlet />
            <Footer className="mt-auto" />
        </section>
    )
})
MainLayout.displayName = 'MainLayout'
