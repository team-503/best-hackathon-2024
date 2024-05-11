import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CurrentThemeIcon } from '@/modules/theme/components/current-theme-icon'
import { ThemeIcons } from '@/modules/theme/components/theme-icons'
import { Theme, useThemeStore } from '@/modules/theme/stores/theme.store'
import { cn } from '@/utils/cn'
import { memo, useCallback } from 'react'

type ThemeSelectorProps = React.ComponentProps<typeof Button> & {
    align?: React.ComponentProps<typeof DropdownMenuContent>['align']
}
export const ThemeSelector: React.FC<ThemeSelectorProps> = memo(({ align, children, ...props }) => {
    const currentTheme = useThemeStore(state => state.theme)
    const setTheme = useThemeStore(state => state.setTheme)

    const onThemeChange = useCallback(
        (newTheme: Theme) => {
            return () => {
                setTheme(newTheme)
            }
        },
        [setTheme],
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" {...props}>
                    <CurrentThemeIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className="space-y-1">
                {Object.keys(ThemeIcons).map(theme => (
                    <DropdownMenuItem
                        key={theme}
                        onClick={onThemeChange(theme as Theme)}
                        className={cn(
                            'flex cursor-pointer gap-2 capitalize',
                            theme === currentTheme && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                        )}
                    >
                        {theme}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
})
ThemeSelector.displayName = 'ThemeSelector'
