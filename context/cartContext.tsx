"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { DishConfig } from "../utils/types/types"


// interface DishConfig {
//     name: string,
//     price: number | undefined,
//     imageUrl: string,
//     sizeDishName: string
// }

interface DishCartContextProps {
    // dish: DishConfig | undefined,
    // setDish: (dish: DishConfig) => void,
    cartItensArray: DishConfig[],
    warning: string,
    addToCart: (dishInfos: DishConfig) => void
}

// Cria onde add os dados globalmente
export const CartContext = createContext<DishCartContextProps | undefined>(undefined)


// Indica quem pode ter acesso aos dados
export function CartContextProvider({ children }: { children: ReactNode }) {

    // const [dish, setDish] = useState<DishConfig>()
    const [warning, setWarning] = useState('')

    // usando os itens no localstage como padrão
    const [cartItensArray, setCartItensArray] = useState<DishConfig[]>(() => {
        const stored = localStorage.getItem('cartItens')
        return stored ? JSON.parse(stored) : []
    })


    // Função responsavel por adicionar itens no
    function addToCart(dishInfos: DishConfig) {
        const alreadyExists = cartItensArray.some(item => item.name === dishInfos.name);
        if (alreadyExists) {
            setWarning('Item já está no carrinho');
        } else {
            setCartItensArray(prev => [...prev, dishInfos]);
        }
    }

    useEffect(() => {
        localStorage.setItem('cartItens', JSON.stringify(cartItensArray))

    }, [cartItensArray.length])



    return (
        <CartContext.Provider value={{ addToCart, cartItensArray, warning }}>
            {children}
        </CartContext.Provider>
    )
}

// Disponibilizada os dados
export function useCartContext() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('Contexto deve ser fornecido')
    }

    return context
}