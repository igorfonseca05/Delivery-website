"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { CartItemProps, DishConfig } from "../utils/types/types"



// interface DishConfig {
//     name: string,
//     price: number | undefined,
//     imageUrl: string,
//     sizeDishName: string
// }

interface DishCartContextProps {
    // dish: DishConfig | undefined,
    // setDish: (dish: DishConfig) => void,
    cartItensArray: CartItemProps[],
    warning: string,
    addToCart: (dishInfos: CartItemProps) => void
    // cartIndicator?: number
    removeCartItem: (id: string) => void
}

// Cria onde add os dados globalmente
export const CartContext = createContext<DishCartContextProps | undefined>(undefined)


// Indica quem pode ter acesso aos dados
export function CartContextProvider({ children }: { children: ReactNode }) {

    const [warning, setWarning] = useState('')
    const [removedItem, setRemovedItem] = useState<DishConfig[]>([])
    // usando os itens no localstage como padrão
    const [cartItensArray, setCartItensArray] = useState<DishConfig[]>(() => {
        const stored = localStorage.getItem('cartItens')
        return stored ? JSON.parse(stored) : []
    })



    // Função responsavel por adicionar itens no
    function addToCart(dishInfos: CartItemProps) {
        const alreadyExists = cartItensArray.some(item => item.name === dishInfos.name);
        if (alreadyExists) {
            setWarning('Item já está no carrinho');
        } else {
            setCartItensArray(prev => [...prev, dishInfos]);
        }
    }

    function removeCartItem(id: string) {
        const updatedCartArray = cartItensArray.filter(cartItem => cartItem.id !== id)
        setCartItensArray(updatedCartArray)
    }

    useEffect(() => {
        localStorage.setItem('cartItens', JSON.stringify(cartItensArray))
    }, [cartItensArray.length])

    // useEffect(() => {
    //     if (removedItem) {
    //         setCartItensArray(removedItem)
    //     }
    // }, [removedItem])

    return (
        <CartContext.Provider value={{ addToCart, cartItensArray, warning, removeCartItem }}>
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