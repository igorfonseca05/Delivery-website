
import { useEffect, useState } from "react";
import { db, addDoc, Timestamp, collection } from "../firebase/firebase";
import { CartItemProps, UserData } from "../utils/types/types";

interface OrderProps {
    userData: UserData
    cartItens: CartItemProps[]
}

export function useFirebase({ userData, cartItens }: OrderProps) {

    const [docs, setDoc] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function saveOrder(userData: UserData, cartItens: CartItemProps[]) {
        setLoading(true)
        setError(null)

        try {

            const order = {
                user: userData,
                cart: cartItens,
                createdAt: Timestamp.now(),
                status: 'pago'
            }

            const docRef = await addDoc(collection(db, 'pedidos'), order)

            console.log('Pedido salvo com ID:', docRef.id)

        } catch (error: any) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    async function getOrdersByUserId(uid: string) {
        // lógica para buscar pedidos do usuário...
    }

    async function updateOrderStatus(orderId: string, newStatus: string) {
        // lógica para atualizar status...
    }

    return {
        saveOrder,
        getOrdersByUserId,
        updateOrderStatus,
        loading,
        error,
    }
}


