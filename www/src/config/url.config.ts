export class UrlConfig {
    private static authPrefix = '/auth'
    private static appPrefix = '/app'
    private static createEventPrefix = '/create-event'

    public static home = {
        label: 'Home',
        url: '/',
    }
    public static main = {
        label: 'Home',
        url: '/home',
    }
    public static notFound = {
        label: '404',
        url: '/not-found',
    }
    public static error = {
        label: 'Error',
        url: '/error',
    }

    public static auth = {
        label: 'Auth',
        url: UrlConfig.authPrefix,
    }
    public static login = {
        label: 'Login',
        url: `${UrlConfig.authPrefix}/login`,
        register: {
            label: 'Реєстрація',
            url: `${UrlConfig.authPrefix}/register`,
        },
    }
    public static register = {
        label: 'Register',
        url: `${UrlConfig.authPrefix}/register`,
    }
    public static createEvent = {
        label: 'Create event',
        url: UrlConfig.createEventPrefix,
    }
    public static app = {
        label: 'App',
        url: UrlConfig.appPrefix,
    }
}

export class UrlConfigApi {
    private static apiUrl = import.meta.env.VITE_API_URL
}
