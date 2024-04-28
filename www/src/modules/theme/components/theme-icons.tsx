import { Moon, Sparkles, Sun } from 'lucide-react'

const defaultIconProps = {
    strokeWidth: 1.5,
    size: 22,
} as const


export const ThemeIcons = {
    light: (props: React.ComponentProps<typeof Sun>) => <Sun {...defaultIconProps} {...props} />,
    dark: (props: React.ComponentProps<typeof Moon>) => <Moon {...defaultIconProps} {...props} />,
    system: (props: React.ComponentProps<typeof Sparkles>) => <Sparkles {...defaultIconProps} {...props} />,
}
