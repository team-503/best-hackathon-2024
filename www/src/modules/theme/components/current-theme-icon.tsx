import { ThemeIcons } from '@/modules/theme/components/theme-icons'
import { useThemeStore } from '@/modules/theme/stores/theme.store'
import { memo, useMemo } from 'react'

type CurrentThemeIconProps = React.ComponentProps<typeof ThemeIcons.light | typeof ThemeIcons.dark>
export const CurrentThemeIcon: React.FC<CurrentThemeIconProps> = memo(({ ...props }) => {
    const theme = useThemeStore(state => state.theme)

    const Icon = useMemo(() => ThemeIcons[theme], [theme])

    return Icon ? <Icon {...props} /> : null
})
CurrentThemeIcon.displayName = 'CurrentThemeIcon'
