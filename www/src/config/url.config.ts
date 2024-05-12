export class UrlConfig {
    private static authPrefix = '/auth'
    private static appPrefix = '/app'

    public static main = {
        label: 'Головна',
        url: '/',
    }
    public static notFound = {
        label: '404',
        url: '/not-found',
    }
    public static error = {
        label: 'Помилка',
        url: '/error',
    }

    public static auth = {
        label: 'Авторизація',
        url: UrlConfig.authPrefix,
    }
    public static login = {
        label: 'Логін',
        url: `${UrlConfig.authPrefix}/login`,
    }

    public static app = {
        label: 'Додаток',
        url: UrlConfig.appPrefix,
    }
    public static eventId = {
        label: 'Подія',
        url: `${UrlConfig.appPrefix}/event/:id`,
        getDynamicUrl: (eventId: string) => `${UrlConfig.appPrefix}/event/${eventId}`,
    }
    public static eventOsintId = {
        label: 'Подія',
        url: `${UrlConfig.appPrefix}/event-osint/:id`,
        getDynamicUrl: (eventId: string) => `${UrlConfig.appPrefix}/event-osint/${eventId}`,
    }
    public static createEvent = {
        label: 'Створити подію',
        url: `${UrlConfig.appPrefix}/create-event`,
    }
}

export class UrlConfigApi {
    private static apiUrl = import.meta.env.VITE_API_URL
}
