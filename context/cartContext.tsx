"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { CartItemProps, DishConfig } from "../utils/types/types"

import { useMessageContext } from "./messagesContext"
import { useToggleCartContext } from "./toggleCartContext"
import { UserData } from "../utils/types/types"
import { OrderProps } from "../utils/types/types"

interface DishCartContextProps {
    addToCart: (dishInfos: CartItemProps) => void,
    removeCartItem: (id: string) => void,
    setTotal: (total: number) => void,
    total: number,
    setUserData: (userData: UserData) => void,
    deliveryFee: number,
    setDeliveryFee: (deliveryFee: number) => void,
    totalCartItens: number,
    setTotalCartItens: (totalCartItens: number) => void,
    order: OrderProps,
    setOrder: (order: OrderProps) => void
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


    const [order, setOrder] = useState<OrderProps>(() => {
        const storage = localStorage.getItem('order')
        return storage ? JSON.parse(storage) : {
            cartItens: [],
            orderDetails: {},
            userData: {},
            deliveryAndPayment: {}
        }
    })

    // Função responsavel por adicionar itens no carrinho
    function addToCart(dishInfos: CartItemProps) {
        const alreadyExists = order.cartItens.some(item => item.name === dishInfos.name);
        if (alreadyExists) {
            setError('Dado já adicionado ao carrinho')
            setCartIsOpen(false)
        } else {
            setOrder(prev => ({
                ...prev,
                cartItens: [...prev.cartItens, dishInfos]
            }))
        }
    }

    // Função responsável por remover item do carrinho
    function removeCartItem(id: string) {
        const updatedCartArray = order.cartItens.filter(cartItem => cartItem._id !== id)

        setOrder(prev => ({
            ...prev,
            cartItens: [...updatedCartArray]
        }))
    }

    // Atualizar dados no localstorage
    useEffect(() => {
        userData && setOrder(prev => ({
            ...prev,
            userData: { ...userData }
        }))

        // Se carrinho vazio, total compra é zero
        if (order.cartItens.length === 0) {
            setTotal(0)
            setOrder(prev => ({
                ...prev,
                orderDetails: {
                    subTotal: 0,
                    deliveryFee,
                    totalCartItens: order.cartItens.length,
                    total: 0 + deliveryFee
                }
            }))
        }
    }, [order.cartItens.length, userData])


    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order))
    }, [order])

    return (
        <CartContext.Provider value={{
            addToCart,
            removeCartItem,
            total,
            setTotal,
            setUserData,
            setDeliveryFee,
            deliveryFee,
            totalCartItens,
            setTotalCartItens,
            order,
            setOrder
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