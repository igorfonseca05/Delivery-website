"use client"

import { useContext, createContext, ReactNode, useState } from "react"

interface QuantityProps {
    quantity: number,
    setQuantity: (quantity: number) => void,
    increase: () => void
    decrease: () => void
}

export const QuantityContext = createContext<QuantityProps | undefined>(undefined)

export function QuantityContextProvider({ children }: { children: ReactNode }) {

    const [quantity, setQuantity] = useState(1)

    const increase = () => setQuantity(q => q + 1)
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))

    return (
        <QuantityContext.Provider value={{ quantity, increase, decrease, setQuantity }}>
            {children}
        </QuantityContext.Provider>
    )
}

export function useQuantityContext() {
    const context = useContext(QuantityContext)

    if (!context) {
        throw new Error('O contexto da quantidae deve ser fornecido')
    }

    return context
}