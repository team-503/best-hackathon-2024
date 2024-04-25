import { memo } from 'react'
import { Outlet } from 'react-router-dom'

type MainLayoutProps = unknown
export const MainLayout: React.FC<MainLayoutProps> = memo(() => {
    return (
        <>
            <Outlet />
        </>
    )
})
MainLayout.displayName = 'MainLayout'
