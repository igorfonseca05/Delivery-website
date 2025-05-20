"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { CartItemProps, DishConfig } from "../utils/types/types"

interface DishCartContextProps {
    cartItensArray: CartItemProps[],
    warning: string,
    addToCart: (dishInfos: CartItemProps) => void
    removeCartItem: (id: string) => void,
    setTotal: (total: number) => void
    total: number
}

// Cria onde add os dados globalmente
export const CartContext = createContext<DishCartContextProps | undefined>(undefined)


// Indica quem pode ter acesso aos dados
export function CartContextProvider({ children }: { children: ReactNode }) {

    const [warning, setWarning] = useState('')
    const [total, setTotal] = useState<number>(0)

    // usando os itens no localstage como padrão
    const [cartItensArray, setCartItensArray] = useState<DishConfig[]>(() => {
        const stored = localStorage.getItem('cartItens')
        return stored ? JSON.parse(stored) : []
    })


    // Função responsavel por adicionar itens no carrinho
    function addToCart(dishInfos: CartItemProps) {
        const alreadyExists = cartItensArray.some(item => item.name === dishInfos.name);
        if (alreadyExists) {
            setWarning('Item já está no carrinho');
        } else {
            setCartItensArray(prev => [...prev, dishInfos]);
        }
    }

    // Função responsavel por remover item do carrinho
    function removeCartItem(id: string) {
        const updatedCartArray = cartItensArray.filter(cartItem => cartItem.id !== id)
        setCartItensArray(updatedCartArray)
    }

    // Atualizar dados de carrinho no localstorage
    useEffect(() => {
        localStorage.setItem('cartItens', JSON.stringify(cartItensArray))

        // Se carrinho vazio, total compra é zero
        if (cartItensArray.length === 0) setTotal(0)
    }, [cartItensArray.length])


    return (
        <CartContext.Provider value={{
            addToCart,
            cartItensArray,
            warning,
            removeCartItem,
            total,
            setTotal,
        }
        }>
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