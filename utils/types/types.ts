
export interface DishConfig {
    _id: string
    name: string,
    price: number,
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
    _id: string
    name: string,
    price: number,
    imageUrl: string,
    sizeDishName: string,
    quantity?: number
    orderNote?: string
}


export interface FoodCardProps {
    _id: string
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
    _id: string
    category: string
    name: string
    description: string
    image: string,
    price?: number,
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


// export interface UserData {
//     nome: string,
//     email: string,
//     telefone: string,
//     endereco: {
//         cidade: string,
//         complemento: string,
//         bairro: string,
//         numero: string,
//         CEP: string,
//         rua: string,
//     }
// }
export interface UserData {
    nome: string,
    sobrenome: string,
    email: string,
    telefone: string,
    cidade: string,
    complemento: string,
    bairro: string,
    numero: string,
    CEP: string,
    rua: string,
}

export type StatusPedido =
    | 'Recebido'
    | 'Em Preparo'
    | 'A Caminho'
    | 'Entregue'
    | 'Cancelado';

export interface OrderStatusCardProps {
    user: UserData;
    item: DishConfig;
    status: StatusPedido;
}

export interface UserProfileAddress {
    nome: string,
    email: string,
    telefone: string,
    endereço: string,
    cidade: string,
    estado: string,
    CEP: string,
    país: string,
    metodoPagamento: string,
    detalhesEntrega: string,
}

export interface OrderWithotAuthProps {
    userData: UserData,
    cartItens: CartItemProps[],
    orderDatails: {
        total: number,
        totalCartItens: number,
        deliveryFee: number
    }
}