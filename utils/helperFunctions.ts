
export function verifyEnvironment() {

    const test = 'production'

    const isDevelopmentEnv = process.env.NODE_ENV === 'test'
    const isProductionEnv = 'production' === 'production'
    const localAPI = process.env.NEXT_PUBLIC_API
    const remoteAPI = process.env.NEXT_PUBLIC_MENU_API

    const apiURL = isDevelopmentEnv && localAPI || isProductionEnv && remoteAPI

    return apiURL
}


export function upperCaseText(text: string) {
    return text[0].toUpperCase() + text.slice(1)
}