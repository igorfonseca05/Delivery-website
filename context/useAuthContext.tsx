"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { FirebaseUser } from "../utils/types/types";
import { User } from "firebase/auth";

interface AuthContextProps {
    user: User | null,
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)


export function AuthContextProvider({ children, value }: { children: ReactNode, value: AuthContextProps }) {

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Contexto deve ser fornecido')
    }

    return context
}