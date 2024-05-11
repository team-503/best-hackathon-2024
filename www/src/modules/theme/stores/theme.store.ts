import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Theme = 'light' | 'dark' | 'system'

type UseThemeStore = {
    theme: Theme
    setTheme: (theme: UseThemeStore['theme']) => void
}

export const useThemeStore = create<
    UseThemeStore,
    [['zustand/devtools', UseThemeStore], ['zustand/persist', UseThemeStore], ['zustand/immer', UseThemeStore]]
>(
    devtools(
        persist(
            immer(set => ({
                theme: 'system',
                setTheme: theme =>
                    set(state => {
                        state.theme = theme
                    }),
            })),
            {
                name: 'theme',
            },
        ),
    ),
)
