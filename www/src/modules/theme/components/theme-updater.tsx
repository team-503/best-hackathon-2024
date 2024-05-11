import { useThemeStore } from '@/modules/theme/stores/theme.store'
import { getSystemTheme } from '@/modules/theme/utils/get-system-theme'
import { memo, useEffect } from 'react'

type ThemeUpdaterProps = unknown
export const ThemeUpdater: React.FC<ThemeUpdaterProps> = memo(() => {
    const theme = useThemeStore(state => state.theme)

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = getSystemTheme()
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    return null
})
ThemeUpdater.displayName = 'ThemeUpdater'
