"use client"

import { useContext, createContext, useState } from "react"

interface CartContext {
    cartIsOpen: boolean,
    setCartIsOpen: (cardIsOpen: boolean) => void
}

export const CartContext = createContext<CartContext | undefined>(undefined)

export function CartContextProvider({ children }: { children: React.ReactNode }) {

    const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)

    return (
        <CartContext.Provider value={{ cartIsOpen, setCartIsOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('Contexto deve ser fornecido')
    }

    return context
}