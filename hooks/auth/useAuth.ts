'use client'

import { useEffect, useState } from 'react'
import { auth, createUserWithEmailAndPassword, updateProfile } from '../../firebase/firebase'


interface UserProps {
    name: string,
    email: string,
    password: string

}

export function useAuth() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [cancelled, setCancelled] = useState(false)

    //  CleanUp
    function checkIfCancelled() {
        if (cancelled) return
    }

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
            setError(error.message)
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

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { createUser, loading, error }

}