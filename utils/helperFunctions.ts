
import crypyto from 'crypto';

export function verifyEnvironment() {

    const isDevelopmentEnv = process.env.NODE_ENV === 'development'
    const isProductionEnv = process.env.NODE_ENV === 'production'
    const localAPI = process.env.NEXT_PUBLIC_API
    const remoteAPI = process.env.NEXT_PUBLIC_MENU_API

    const apiURL = isDevelopmentEnv && localAPI || isProductionEnv && remoteAPI

    return apiURL
}


export function upperCaseText(text: string) {
    return text[0].toUpperCase() + text.slice(1).toLocaleLowerCase()
}


export function getImageSourceType(url: string) {
    return process.env.NODE_ENV === 'development' ?
        `http://localhost:4000/${url}` :
        url
}


export function selectEnvironment(path: string): string {
    const env = process.env.NODE_ENV;

    if (env === 'development') {
        return path; // normalmente usado com fetch localmente
    }

    if (env === 'production') {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seuapp.vercel.app';
        return `${baseUrl}${path}`;
    }

    // Fallback para evitar erro se NODE_ENV for algo inesperado
    throw new Error(`Unrecognized environment: ${env}`);
}

const secretkey = crypyto.randomBytes(32)
const iv = crypyto.randomBytes(16)

export function cipherText(text: string) {
    const cipher = crypyto.createCipheriv('aes-256-ccm', secretkey, iv)

    let encryptText = cipher.update(text, 'utf8', 'hex')
    encryptText += cipher.final('hex')

    return {
        encryptText: encryptText,
        iv: iv.toString('hex'),
        key: secretkey.toString('hex')
    }
}