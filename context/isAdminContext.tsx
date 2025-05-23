'use client' // ← necessário para que useState e useContext funcionem

import { createContext, ReactNode, useContext, useState } from 'react'

interface IsAdimProps {
    isAdmin: boolean
    setIsAdmin: (isAdmin: boolean) => void
}

const AdminContext = createContext<IsAdimProps | undefined>(undefined)

export function AdminContextProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdminContext() {
    const context = useContext(AdminContext)

    if (!context) {
        throw new Error('useAdminContext deve ser usado dentro de um AdminContextProvider')
    }

    return context
}
