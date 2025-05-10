'use client'

import { useEffect, useState } from "react"

// Context
import { AuthContextProvider } from "../../../context/useAuthContext"

// Firebase type
import { User } from "firebase/auth"

// Hook
import { auth } from "../../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"

// Components
import { CustomLoadingPage } from "@/app/fallbackContainer"
import { redirect } from "next/navigation"
import Login from "@/app/(public)/login/page"
import { PrivateRoute } from "./Protect/private"

// import { useRouter } from 'next/compat/router'
import { useRouter } from 'next/navigation'



/**Esse componente existe para monitorar o estado de autenticação do usuário
 * isso porque não podemos fazer o monitoramento direto dentro do layout.tsx 
 * e compartilhar o estado entre as páginas da aplicação uma vez que contexts
 * não podem ser utilizados dentro de server components.
 */

// interface User {
//     user: FirebaseUser | null
// }

export function AuthGlobalContext({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    // 
    const router = useRouter()

    const loadingUser = user === undefined

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            setUser(user)
            // !user && setLoading(true)
        })
        return () => unsubscribed()
    }, [auth, router])

    useEffect(() => {

        if (user) {
            router?.push('/')
        } else {
            router?.push('/login')
        }

    }, [user])

    if (loadingUser) {
        return <CustomLoadingPage />
    }



    return (
        <AuthContextProvider value={{ user }}>
            <PrivateRoute>
                {children}
            </PrivateRoute>
        </AuthContextProvider>
    )
}