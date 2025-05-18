"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface dishConfig {
    name: string,
    price: number | undefined,
    imageUrl: string,
    sizeDishName: string
}

interface DishProps {
    dish: dishConfig | undefined,
    setDish: (dish: dishConfig) => void
}


export const CartContext = createContext<DishProps | undefined>(undefined)


export function CartContextProvider({ children }: { children: ReactNode }) {

    const [dish, setDish] = useState<dishConfig>()

    return (
        <CartContext.Provider value={{ dish, setDish }}>
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