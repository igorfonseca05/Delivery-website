'use client'

import { useEffect } from "react"
import { useAuthContext } from "../../../../context/useAuthContext"
import { useRouter } from "next/router"

export function PrivateRoute({ children }: { children: React.ReactNode }) {

    const { user } = useAuthContext()
    const router = useRouter()

    // useEffect(() => {
    //     if (!loading && !user) {
    //         router.push('/login')
    //     }
    // }, [user, loading, router])

    // if (loading || !user) {
    //     return <p>Carregando</p>
    // }

    return (
        <>{children}</>
    )

}