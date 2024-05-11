import { Large } from '@/components/typography/large'
import { UrlConfig } from '@/config/url.config'
import { ThemeSelector } from '@/modules/theme/components/theme-selector'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type HeaderProps = unknown
export const Header: React.FC<HeaderProps> = memo(() => {
    return (
        <header className="sticky top-0 z-50 flex h-[80px] justify-center border-b bg-background/95 backdrop-blur">
            <div className="container flex items-center justify-between">
                <Link to={UrlConfig.home.url}>
                    <Large className="uppercase">Logo</Large>
                </Link>
                <div className="flex items-center justify-end gap-3">
                    <ThemeSelector variant="outline" />
                </div>
            </div>
        </header>
    )
})
Header.displayName = 'Header'
