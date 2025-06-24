"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { CartItemProps, DishConfig } from "../utils/types/types"

import { useMessageContext } from "./messagesContext"
import { useToggleCartContext } from "./toggleCartContext"
import { UserData } from "../utils/types/types"

interface DishCartContextProps {
    cartItensArray: CartItemProps[],
    setCartItensArray: (cartItensArray: CartItemProps[] | []) => void,
    // warning: string,
    addToCart: (dishInfos: CartItemProps) => void,
    removeCartItem: (id: string) => void,
    setTotal: (total: number) => void,
    total: number,
    setUserData: (userData: UserData) => void,
    deliveryFee: number,
    setDeliveryFee: (deliveryFee: number) => void,
    totalCartItens: number,
    setTotalCartItens: (totalCartItens: number) => void,
}


// Cria onde add os dados globalmente
export const CartContext = createContext<DishCartContextProps | undefined>(undefined)

// Indica quem pode ter acesso aos dados
export function CartContextProvider({ children }: { children: ReactNode }) {

    const { setError } = useMessageContext()
    const { setCartIsOpen } = useToggleCartContext()

    const [total, setTotal] = useState<number>(0)
    const [userData, setUserData] = useState<UserData>()
    const [deliveryFee, setDeliveryFee] = useState<number>(0)
    const [totalCartItens, setTotalCartItens] = useState<number>(0)


    // usando os itens no localstage como padrão
    const [cartItensArray, setCartItensArray] = useState<DishConfig[]>(() => {
        const stored = localStorage.getItem('cartItens')
        return stored ? JSON.parse(stored) : []

    })

    // Função responsavel por adicionar itens no carrinho
    function addToCart(dishInfos: CartItemProps) {
        const alreadyExists = cartItensArray.some(item => item.name === dishInfos.name);
        if (alreadyExists) {
            setError('Dado já adicionado ao carrinho')
            setCartIsOpen(false)
        } else {
            // setCartItensArray(prev => [...prev, dishInfos]);
            setCartItensArray(prev => [...prev, dishInfos]);
        }
    }

    // Função responsável por remover item do carrinho
    function removeCartItem(id: string) {
        const updatedCartArray = cartItensArray.filter(cartItem => cartItem._id !== id)
        setCartItensArray(updatedCartArray)
    }

    // Atualizar dados no localstorage
    useEffect(() => {
        const orderData = {
            userData,
            cartItens: [
                ...cartItensArray
            ],
            orderDatails: {
                total,
                totalCartItens,
                deliveryFee
            }
        }

        localStorage.setItem('cartItens', JSON.stringify(cartItensArray))
        userData && localStorage.setItem('userData', JSON.stringify(userData))
        userData && localStorage.setItem('order', JSON.stringify(orderData))


        // Se carrinho vazio, total compra é zero
        if (cartItensArray.length === 0) setTotal(0)
        if (cartItensArray.length === 0) setTotalCartItens(0)
    }, [cartItensArray.length, userData, total])


    return (
        <CartContext.Provider value={{
            addToCart,
            cartItensArray,
            removeCartItem,
            total,
            setTotal,
            setUserData,
            setDeliveryFee,
            deliveryFee,
            totalCartItens,
            setTotalCartItens,
            setCartItensArray,
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