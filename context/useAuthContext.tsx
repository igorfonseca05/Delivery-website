"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { FirebaseUser } from "../utils/types/types";

interface AuthContextProps {
    user: FirebaseUser | null,
    setUser: (user: FirebaseUser | null) => void
}


export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<FirebaseUser | null>(null)

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function userAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Contexto deve ser fornecido')
    }

    return context
}