import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { apolloClient } from '@/config/apollo.config'
import { UrlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { User } from 'lucide-react'
import { memo, useCallback } from 'react'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from 'react-router-dom'

type UserMenuButtonProps = React.ComponentProps<typeof Button> & {
    align?: React.ComponentProps<typeof DropdownMenuContent>['align']
}
export const UserMenuButton: React.FC<UserMenuButtonProps> = memo(({ align, children, ...props }) => {
    const setUser = useUserStore(state => state.setUser)
    const signOut = useSignOut()
    const navigate = useNavigate()

    const onLogOut = useCallback(() => {
        setUser(null)
        signOut()
        apolloClient.cache.reset()
        navigate(UrlConfig.main.url)
    }, [navigate, setUser, signOut])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" {...props}>
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className="space-y-1">
                <DropdownMenuItem onSelect={onLogOut} className="flex cursor-pointer gap-2">
                    Вийти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
})
UserMenuButton.displayName = 'UserMenuButton'
