'use client'

import Image from "next/image"
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation"

import { useCartContext } from "../../../../../../context/cartContext";
import { useMessageContext } from "../../../../../../context/messagesContext";

interface CartProps {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    quantity?: number
}

export function CardItem({ id, name, imageUrl, price, quantity }: CartProps) {

    const path = usePathname()
    const { setError } = useMessageContext()
    const { removeCartItem } = useCartContext()


    return (
        <div className="flex p-2 gap-x-2 cardSidebarColor rounded-lg">
            <Image
                src={`/${imageUrl}`}
                alt="food"
                width={75}
                height={75}
                className="rounded-lg"
            />
            <div className=" flex flex-col justify-between w-full">
                <div className="flex items-center justify-between">
                    <p className="font-bold">{name}</p>
                    <span className="mr-1">{quantity && `x${quantity}`}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>R$ {price?.toFixed(2)} <span className="text-[11px]">Uni.</span> </span>
                    {path !== '/payment' &&
                        <Trash2
                            size={22}
                            onClick={() => removeCartItem(id)} className="cursor-pointer mr-1" />}
                    {path === '/payment' &&
                        <Trash2
                            size={22}
                            onClick={() => removeCartItem(id)} className="cursor-pointer mr-1" />}
                </div>

            </div>
        </div>
    )
}