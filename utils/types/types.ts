
export interface DishConfig {
    id: string
    name: string,
    price: number | undefined,
    imageUrl: string,
    sizeDishName: string,
    sizes?: [
        {
            type: string,
            price: number,
            id: number
        }
    ]
    quantity?: number
    orderNote?: string,
}
export interface CartItemProps {
    id: string
    name: string,
    price: number | undefined,
    imageUrl: string,
    sizeDishName: string,
    quantity?: number
    orderNote?: string
    cartIndicator?: number
}


export interface FoodCardProps {
    id: string
    name: string;
    imageUrl: string;
    category: string
    sizes: [
        {
            type: string,
            price: number,
            id: number
        }
    ],
    description: string
}


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

export interface Sizes {
    type?: string
    price?: number
    id?: number
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
