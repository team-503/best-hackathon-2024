import { useThemeStore } from '@/modules/theme/stores/theme.store'
import { Children } from '@/types/children.type'
import { memo } from 'react'

type CurrentThemeOnlyProps = {
    theme: string
    children?: Children
}
export const CurrentThemeOnly: React.FC<CurrentThemeOnlyProps> = memo(({ theme, children }) => {
    const currentTheme = useThemeStore(state => state.theme)

    return currentTheme === theme ? children : null
})
CurrentThemeOnly.displayName = 'CurrentThemeOnly'
