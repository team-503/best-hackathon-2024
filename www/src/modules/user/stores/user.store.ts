import { UserType } from '@/__generated__/graphql'
import { Maybe } from 'graphql/jsutils/Maybe'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UseUserStore = {
    user: Maybe<UserType>
    setUser: (user: UseUserStore['user']) => void
}

export const useUserStore = create<
    UseUserStore,
    [['zustand/devtools', UseUserStore], ['zustand/persist', UseUserStore], ['zustand/immer', UseUserStore]]
>(
    devtools(
        persist(
            immer(set => ({
                user: null,
                setUser: user =>
                    set(state => {
                        state.user = user
                    }),
            })),
            {
                name: 'User',
            },
        ),
    ),
)
