'use client'

import { MdClose } from "react-icons/md"
import { PricesCart } from "./pricesCart"
import { HeaderCart } from "./cardHeader"

import { useState } from "react"
import { useCartContext } from "@/context/cartContext"
import { CardItem } from "./itemsCard"

export function CartContainer() {

    const { cartIsOpen } = useCartContext()

    return (
        <div className={`fixed right-0 p-4 py-3 h-full z-2 w-75 bg-white ${cartIsOpen ? 'cardIsOpen' : 'cardIsClose'}`}>
            <div className="flex flex-col h-full  justify-between">
                <HeaderCart />
                <div className="grow-2 mt-4 rounded-lg">
                    <CardItem />
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <PricesCart />
                    <button className="buttonStyle w-full mt-2">
                        Finalizar pedido
                    </button>
                </div>
            </div>

        </div>
    )
}