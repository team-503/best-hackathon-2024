import { UserPartialInput, UserTypeEnum, useUpdateProfileMutation } from '@/__generated__/graphql'
import { useUserStore } from '@/modules/user/stores/user.store'
import { useCallback } from 'react'
import { To, useNavigate } from 'react-router-dom'

export const useFinishRegistration = () => {
    const navigate = useNavigate()
    const setUser = useUserStore(state => state.setUser)
    const [updateProfileMutation, updateProfileMutationData] = useUpdateProfileMutation()

    const finishRegistration = useCallback(
        async (url: To, values: UserPartialInput) => {
            const res = await updateProfileMutation({
                variables: {
                    user: {
                        userType: UserTypeEnum.Provider,
                        ...values,
                    },
                },
            })
            if (!res.data?.updateProfile) {
                throw new Error('Profile update failed')
            }
            setUser(res.data.updateProfile)
            navigate(url)
        },
        [navigate, setUser, updateProfileMutation],
    )

    return {
        finishRegistration,
        updateProfileMutationData,
    }
}
