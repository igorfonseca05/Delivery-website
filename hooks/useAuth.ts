'use client'

import { useEffect, useState } from 'react'
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithEmailAndPassword
} from '../firebase/firebase'

import { useAdminContext } from '../context/isAdminContext'

import { FirebaseError } from 'firebase/app'

// Context

interface UserProps {
    name: string,
    email: string,
    password: string

}

/** Hook responsável por gerenciar o processo de inscrição do usuário
 * com estados de loading, error, função de cleanUp. 
 */

export function useAuth() {

    const { setIsAdmin } = useAdminContext()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [cancelled, setCancelled] = useState(false)

    //  CleanUp
    function checkIfCancelled() {
        if (cancelled) return
    }

    // Função de adicioanar usuário
    async function createUser({ name, email, password }: UserProps) {
        checkIfCancelled()
        setLoading(true)
        setError('')

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(user, {
                displayName: name || 'User'
            })

            return user

        } catch (error: any) {
            const code = error.code;

            let expectedError

            if (code.includes("email-already-in-use")) {
                expectedError = "Este e-mail já está em uso."
            } else if (code.includes("invalid-email")) {
                expectedError = "E-mail inválido. Verifique e tente novamente."
            } else if (code.includes("weak-password")) {
                expectedError = "A senha precisa ter pelo menos 6 caracteres."
            } else {
                expectedError = "Erro ao criar conta. Tente novamente."
            }

            setError(expectedError)

        } finally {
            setLoading(false)
        }
    }


    // Login

    async function signIn({ email, password }: { email: string, password: string }) {
        checkIfCancelled()
        setLoading(true)
        setError('')

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)

            return user
        } catch (error: any) {


            console.log(error)

            if (error instanceof FirebaseError) {
                let errorMessage = "";

                if (error.code === "auth/invalid-email") {
                    errorMessage = "O e-mail informado é inválido.";
                } else if (error.code === "auth/user-not-found") {
                    errorMessage = "Usuário não encontrado. Verifique o e-mail.";
                } else if (error.code === "auth/wrong-password") {
                    errorMessage = "Senha incorreta. Tente novamente.";
                } else if (error.code === "auth/too-many-requests") {
                    errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
                } else if (error.code === "auth/network-request-failed") {
                    errorMessage = "Erro de conexão. Verifique sua internet.";
                } else if (error.code === "auth/invalid-credential") {
                    errorMessage = 'Usuário não cadastrado'
                } else {
                    errorMessage = "Ocorreu um erro desconhecido: " + error.message;
                }

                setError(errorMessage)
            }

        } finally {
            setLoading(false)
        }
    }


    // SignOut
    function logout() {
        checkIfCancelled()
        signOut(auth)
    }


    // Ativador da função de cleanUp
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { createUser, loading, error, logout, signIn }

}


