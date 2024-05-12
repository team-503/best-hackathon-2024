import { useGetUserQuery } from '@/__generated__/graphql'
import Zenlenski from '@/assets/images/president.png'
import { UrlConfig } from '@/config/url.config'
import { ThemeSelector } from '@/modules/theme/components/theme-selector'
import { memo } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Link } from 'react-router-dom'

type HeaderProps = unknown
export const Header: React.FC<HeaderProps> = memo(() => {
    const isAuth = useIsAuthenticated()
    const { data } = useGetUserQuery()

    return (
        <header className="sticky top-0 z-50 flex h-[80px] justify-center border-b bg-background/95 backdrop-blur">
            <div className="container flex items-center justify-between">
                <Link to={UrlConfig.main.url}>
                    <img src={Zenlenski} height={40} width={40} className="rounded-xl transition-all hover:scale-125" />
                </Link>
                <div className="flex items-center gap-4">
                    {isAuth && data?.me.type !== 'VOLUNTEER' && (
                        <div className="">
                            <Link to={UrlConfig.createEvent.url}>Створити картку</Link>
                        </div>
                    )}
                    <div className="flex items-center justify-end gap-3">
                        <ThemeSelector variant="outline" />
                    </div>
                </div>
            </div>
        </header>
    )
})
Header.displayName = 'Header'
