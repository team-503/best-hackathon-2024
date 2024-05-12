import { UserTypeEnum, useMeQuery } from '@/__generated__/graphql'
import { Show } from '@/components/show-when'
import { H3 } from '@/components/typography/h3'
import { Button } from '@/components/ui/button'
import { UrlConfig } from '@/config/url.config'
import { ThemeSelector } from '@/modules/theme/components/theme-selector'
import { memo } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Link } from 'react-router-dom'

type HeaderProps = unknown
export const Header: React.FC<HeaderProps> = memo(() => {
    const isAuth = useIsAuthenticated()
    const { data } = useMeQuery()

    return (
        <header className="sticky top-0 z-50 flex h-[80px] justify-center border-b bg-background/95 backdrop-blur">
            <div className="container flex items-center justify-between">
                <Link to={UrlConfig.main.url}>
                    <H3 className="uppercase">Logo</H3>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-end gap-3">
                        <Show>
                            <Show.When isTrue={isAuth && data?.me.type === UserTypeEnum.Rescuer}>
                                <Button asChild variant="outline">
                                    <Link to={UrlConfig.createEvent.url}>Створити подію</Link>
                                </Button>
                            </Show.When>
                        </Show>
                        <ThemeSelector variant="outline" />
                    </div>
                </div>
            </div>
        </header>
    )
})
Header.displayName = 'Header'
