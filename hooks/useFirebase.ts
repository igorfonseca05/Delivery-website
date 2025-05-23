
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


interface OrderProps {
    userData: UserData
    cartItens: CartItemProps[]
}

export function useFirebase() {

    // const [docs, setDoc] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function addDataToFireCollection(collectionName: string, data: Record<string, any>) {
        setLoading(true)
        setError(null)

        try {
            if (!auth.currentUser?.uid) return

            await setDoc(doc(db, collectionName, auth.currentUser?.uid), {
                data,
                createdAt: Timestamp.now(),
            }, { merge: true })

            console.log('Pedido salvo com ID:', auth.currentUser?.uid)

        } catch (error: any) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    // async function getOrdersByUserId(collectionName: string) {
    //     setLoading(true)
    //     setError(null)

    //     try {
    //         if (!auth.currentUser?.uid) return

    //         const docSnap = await getDoc(doc(db, collectionName))

    //         if (docSnap.exists()) {
    //             console.log("Document data:", docSnap.data());
    //         } else {
    //             console.log("No such document!");
    //         }

    //     } catch (error: any) {
    //         console.log(error)
    //         throw error
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    async function getData(collectionName: string) {
        setLoading(true)
        setError(null)

        try {
            if (!auth.currentUser?.uid) return

            const docSnap = await getDoc(doc(db, collectionName))

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }

        } catch (error: any) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    async function updateOrderStatus(orderId: string, newStatus: string) {
        // lógica para atualizar status...
    }


    async function updateCollectionField(collectionName: string, data: Record<string, any>): Promise<void> {
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

    return {
        addDataToFireCollection,
        getData,
        updateOrderStatus,
        updateCollectionField,
        loading,
        error,
    }
}


