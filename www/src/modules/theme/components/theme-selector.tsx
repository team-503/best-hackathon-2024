import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CurrentThemeIcon } from '@/modules/theme/components/current-theme-icon'
import { CurrentThemeOnly } from '@/modules/theme/components/current-theme-only'
import { ThemeIcons } from '@/modules/theme/components/theme-icons'
import { Theme, useThemeStore } from '@/modules/theme/stores/theme.store'
import { memo, useCallback } from 'react'

type ThemeSelectorProps = React.ComponentProps<typeof Button>
export const ThemeSelector: React.FC<ThemeSelectorProps> = memo(({ children, ...props }) => {
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
                <Button variant="ghost" size="icon" {...props}>
                    <CurrentThemeIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.keys(ThemeIcons).map(theme => (
                    <DropdownMenuItem key={theme} onClick={onThemeChange(theme as Theme)} className="flex cursor-pointer gap-2">
                        <span className="capitalize">{theme}</span>
                        <CurrentThemeOnly theme={theme}>
                            <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        </CurrentThemeOnly>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
})
ThemeSelector.displayName = 'ThemeSelector'
