import { NODE_ENV_DEV } from '@/utils/NODE_ENV'
import { initializeApp } from 'firebase/app'
import 'firebase/app-check'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

if (NODE_ENV_DEV) {
    // @ts-expect-error firebase app check debug token
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
export const firebaseGoogleAuthProvider = new GoogleAuthProvider()
// export const firebaseAppCheck = initializeAppCheck(firebaseApp, {
//     provider: new ReCaptchaV3Provider(dotenv.get(ENV.FIRE_APPCHECK_KEY)),
//     isTokenAutoRefreshEnabled: true,
// })
