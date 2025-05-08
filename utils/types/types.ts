
export interface DishesProps {
    id: string
    category: string
    name: string
    description: string
    image: string
    sizes: [
        {
            type: string
            price: number
            id: number
        }
    ]
}


export interface FirebaseUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string | null;
    isAnonymous: boolean;
    providerData: {
        providerId: string;
        uid: string;
        displayName: string | null;
        email: string;
        phoneNumber: string | null;
        photoURL: string | null;
    }[];
    stsTokenManager: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number;
    };
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
}
