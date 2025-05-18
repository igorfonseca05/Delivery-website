"use client"

import { useContext, createContext, useState } from "react"

interface CartContext {
    cartIsOpen: boolean,
    setCartIsOpen: (cardIsOpen: boolean) => void
}

export const ToggleCartContext = createContext<CartContext | undefined>(undefined)

export function ToggleCartContextProvider({ children }: { children: React.ReactNode }) {

    const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)

    return (
        <ToggleCartContext.Provider value={{ cartIsOpen, setCartIsOpen }}>
            {children}
        </ToggleCartContext.Provider>
    )
}

export function useToggleCartContext() {
    const context = useContext(ToggleCartContext)

    if (!context) {
        throw new Error('Contexto deve ser fornecido')
    }

    return context
}