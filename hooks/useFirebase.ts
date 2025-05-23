
import { useEffect, useState } from "react";
import {
    db,
    addDoc,
    Timestamp,
    collection,
    updateDoc,
    serverTimestamp,
    auth,
    doc,
    setDoc,
    getDoc
} from "../firebase/firebase";
import { CartItemProps, UserData } from "../utils/types/types";

import { UserProfileAddress } from "../utils/types/types";

import { DocumentData } from "firebase/firestore";


interface OrderProps {
    userData: UserData
    cartItens: CartItemProps[]
}

interface DocProps {
    data: UserProfileAddress | DocumentData,
    createdAt: Timestamp,
}

export function useFirebase() {

    // const [data, setData] = useState<DocumentData | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)


    const [isMounted, setIsMounted] = useState(true)

    function checkIfMounted() {
        if (!isMounted) return
    }


    async function addOrderGuests(data: Record<string, any>, orderId: string) {
        setLoading(true)
        setError(null)

        try {
            if (!orderId) throw new Error('Insira um orderId')

            await setDoc(doc(db, 'orders_guests', orderId), {
                data,
                createdAt: serverTimestamp(),
                isGuest: true
            })
            console.log('Adicionado com sucesso')
        } catch (error: any) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }
    async function addDataToFireCollection(collectionName: string, data: Record<string, any>) {
        setLoading(true)
        setError(null)

        try {
            if (!auth.currentUser?.uid) return

            await setDoc(doc(db, collectionName, auth.currentUser?.uid), {
                data,
                createdAt: Timestamp.now(),
            }, { merge: true })

            setSuccess('Endereço atualizado sucesso')
            console.log('Adicionado com sucesso')
        } catch (error: any) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    // async function getOrdersByUserId(collectionName: string) {
    // }

    async function getData(collectionName: string): Promise<DocProps | undefined> {
        // checkIfMounted()

        setLoading(true)
        setError(null)

        try {
            if (!auth.currentUser?.uid) throw new Error('Usuário não autenticado')

            const docRef = doc(db, collectionName, auth.currentUser.uid)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                throw new Error('Documento não encontrado')
            }

            return docSnap.data() as DocProps
        } catch (error: any) {
            console.log(error)
            setError(error.message)
            return undefined
        } finally {
            setLoading(false)
            setSuccess(null)
        }
    }

    async function updateOrderStatus(orderId: string, newStatus: string) {
        // lógica para atualizar status...
    }


    async function updateCollectionField(collectionName: string, data: Record<string, any>): Promise<void> {
        // checkIfMounted()

        setLoading(true)
        setError('')

        try {
            if (!auth.currentUser) return

            const docRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(docRef, {
                data,
                updatedAt: serverTimestamp()
            })

            console.log('Dados atualizados com sucesso na coleção' + collectionName)

        } catch (error: any) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     return () => setIsMounted(false)
    // }, [])

    return {
        addDataToFireCollection,
        getData,
        updateOrderStatus,
        updateCollectionField,
        loading,
        error,
        success,
        addOrderGuests
    }
}


