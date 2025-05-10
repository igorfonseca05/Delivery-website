'use client'

import { useEffect } from "react"
import { useAuthContext } from "../../../../context/useAuthContext"
import { useRouter } from "next/compat/router"


export function PrivateRoute({ children }: { children: React.ReactNode }) {

    const { user } = useAuthContext()
    const router = useRouter()

    return (
        <>{children}</>
    )

}