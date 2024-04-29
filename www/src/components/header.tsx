import { Button } from '@/components/ui/button'
import { urlConfig } from '@/config/url.config'
import { ThemeSelector } from '@/modules/theme/components/theme-selector'
import { ClipboardPlus, User } from 'lucide-react'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

type HeaderProps = unknown
export const Header: React.FC<HeaderProps> = memo(() => {
    const location = useLocation()
    const isReceivePage = location.pathname.endsWith('/receive')
    return (
        <header className="flex justify-center border-b-2 py-5">
            <div className="container flex items-center justify-between">
                <Link to={urlConfig.pages.main.url}>
                    <img src="/images/logo.svg" alt="logo" />
                </Link>
                <div className="flex items-center justify-end gap-3">
                    {isReceivePage && (
                        <div className="flex items-center justify-end gap-3">
                            <Button asChild variant="outline" size="icon">
                                <Link to={urlConfig.pages.createPost.url}>
                                    <ClipboardPlus />
                                </Link>
                            </Button>
                        </div>
                    )}
                    <Button asChild variant="outline" size="icon">
                        <Link to={urlConfig.pages.profile.me.url}>
                            <User />
                        </Link>
                    </Button>
                    <ThemeSelector variant="outline" />
                </div>
            </div>
        </header>
    )
})
Header.displayName = 'Header'
