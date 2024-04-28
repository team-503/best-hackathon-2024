import { Footer } from '@/components/footer'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/header'

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
