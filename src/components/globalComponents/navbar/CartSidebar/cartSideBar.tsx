'use client'

import { MdClose } from "react-icons/md"
import { PricesCart } from "./cartFooterTotal"
import { HeaderCart } from "./cardHeader"

import { useState } from "react"
import { useToggleCartContext } from "../../../../../context/toggleCartContext"
import { CardItem } from "./card_sidebar/card_SideBar"

import { useCartContext } from "../../../../../context/cartContext"

export function CartSideBar() {

    const { cartIsOpen } = useToggleCartContext()
    const { cartItensArray } = useCartContext()

    return (
        <div className={`fixed right-0 p-4 py-3 h-full z-2 w-90 bg-white ${cartIsOpen ? 'cardIsOpen shadow-md' : 'cardIsClose'}`}>
            <div className="flex flex-col h-full  justify-between">
                <HeaderCart />
                <div className=" flex flex-col grow-2 mt-4 rounded-lg gap-y-2 overflow-y-auto cartScroll">
                    {cartItensArray.map(({ id, name, price, imageUrl }) => (
                        <CardItem key={id} id={id} name={name} price={price} imageUrl={imageUrl} />
                    ))}
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <PricesCart />
                    <button className="button_primary_medium w-full mt-2">
                        Finalizar pedido
                    </button>
                </div>
            </div>

        </div>
    )
}