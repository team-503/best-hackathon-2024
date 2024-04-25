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
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
export const firebaseProvider = new GoogleAuthProvider()
// export const firebaseAppCheck = initializeAppCheck(firebaseApp, {
//     provider: new ReCaptchaV3Provider(dotenv.get(ENV.FIRE_APPCHECK_KEY)),
//     isTokenAutoRefreshEnabled: true,
// })
