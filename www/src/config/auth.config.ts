import createStore from 'react-auth-kit/createStore'

export const AUTH_TOKEN_KEY = '_auth'

export const authStore = createStore({
    authName: AUTH_TOKEN_KEY,
    authType: 'localstorage',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
})
