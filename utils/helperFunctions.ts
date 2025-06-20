
export function verifyEnvironment() {
    const isDevelopmentEnv = process.env.NODE_ENV === 'development'
    const isProductionEnv = process.env.NODE_ENV === 'production'
    const localAPI = process.env.NEXT_PUBLIC_API
    const remoteAPI = process.env.NEXT_PUBLIC_MENU_API

    const apiURL = isDevelopmentEnv && localAPI || isProductionEnv && remoteAPI

    return apiURL
}


export function upperCaseText(text: string) {
    return text[0].toUpperCase() + text.slice(1)
}