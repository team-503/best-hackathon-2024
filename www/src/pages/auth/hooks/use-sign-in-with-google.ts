import { firebaseAuth, firebaseGoogleAuthProvider } from '@/config/firebase.config'
import { getAdditionalUserInfo, signInWithPopup } from 'firebase/auth'
import { useCallback } from 'react'

export const useSignInWithGoogle = () => {
    return useCallback(async () => {
        const result = await signInWithPopup(firebaseAuth, firebaseGoogleAuthProvider)
        const additionalResult = getAdditionalUserInfo(result)
        const userInfo = result.user
        const additionalUserInfo = additionalResult?.profile
        if (!userInfo?.uid || !userInfo?.displayName || !userInfo?.email) {
            throw new Error('Invalid user info')
        }
        return [
            {
                uid: userInfo?.uid ?? undefined,
                email: userInfo?.email ?? undefined,
                displayName: userInfo?.displayName ?? undefined,
                imageUrl: userInfo?.photoURL ?? undefined,
            },
            {
                userInfo,
                additionalUserInfo,
            },
        ] as const
    }, [])
}
