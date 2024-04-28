import { LoginInput, useLoginMutation } from '@/__generated__/graphql'
import { useUserStore } from '@/modules/user/stores/user.store'
import { useCallback } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { To, useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const [loginMutatoin, loginMutatoinData] = useLoginMutation()
    const signIn = useSignIn()
    const setUser = useUserStore(state => state.setUser)
    const navigate = useNavigate()

    const login = useCallback(
        async (url: To, user: LoginInput) => {
            const res = await loginMutatoin({
                variables: {
                    user,
                },
            })
            if (!res.data?.login?.token || !res.data?.login?.user) {
                throw new Error('Token/user is not provided')
            }
            signIn({
                auth: {
                    token: res.data.login.token,
                    type: 'Bearer',
                },
            })
            setUser(res.data.login.user)
            navigate(url)
        },
        [loginMutatoin, navigate, setUser, signIn],
    )

    return {
        login,
        loginMutatoinData,
    } as const
}
