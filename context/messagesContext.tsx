"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface MessagesProps {
    error: string,
    success: string,
    setError: (error: string) => void,
    setSuccess: (success: string) => void
}


export const MessagesContext = createContext<MessagesProps | undefined>(undefined)

export function MessagesContextProvider({ children }: { children: ReactNode }) {

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    return (
        <MessagesContext.Provider value={{ error, setError, success, setSuccess }}>
            {children}
        </MessagesContext.Provider>
    )
}


export function useModalContext() {
    const context = useContext(MessagesContext)
    if (!context) throw new Error('useModal must be used within a ModalProvider')
    return context
}
