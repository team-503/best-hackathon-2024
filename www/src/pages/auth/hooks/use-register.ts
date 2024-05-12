import { RegisterInput, useRegisterMutation } from '@/__generated__/graphql'
import { useUserStore } from '@/modules/user/stores/user.store'
import { useCallback } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { To, useNavigate } from 'react-router-dom'

export const useRegister = () => {
    const [registerMutation, registerMutationData] = useRegisterMutation()
    const signIn = useSignIn()
    const setUser = useUserStore(state => state.setUser)
    const navigate = useNavigate()

    const register = useCallback(
        async (url: To, user: RegisterInput) => {
            const res = await registerMutation({
                variables: {
                    user,
                },
            })
            if (!res.data?.register?.token || !res.data?.register?.user) {
                throw new Error('Token/user is not provided')
            }
            signIn({
                auth: {
                    token: res.data.register.token,
                    type: 'Bearer',
                },
            })
            setUser(res.data.register.user)
            navigate(url)
        },
        [navigate, registerMutation, setUser, signIn],
    )

    return {
        register,
        registerMutationData,
    } as const
}
