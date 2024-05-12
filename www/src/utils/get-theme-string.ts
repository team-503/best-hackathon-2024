export const getThemeTypeString = (theme: string): string => {
    switch (theme) {
        case 'light':
            return 'Світла'
        case 'dark':
            return 'Темна'
        case 'system':
            return 'Системна'
        default:
            console.error(`Unknown theme: ${theme}`)
            return ''
    }
}
