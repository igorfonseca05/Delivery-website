"use client"

import { useCartContext } from "../../../../../../../context/cartContext"

interface PriceProps {
    price?: number
    style?: string,
    type?: string
}

export function PriceIndicator({ price, style, type }: PriceProps) {

    const { order: {
        orderDetails: {
            total,
            subTotal,
            deliveryFee,
        }
    } } = useCartContext()

    return (
        <>
            {type === 'totalCartItens' && <span className={style}>R$ {subTotal?.toFixed(2)}</span>}
            {type === 'normal' && <span className={style}>R$ {price?.toFixed(2) || total?.toFixed(2)}</span>}
            {type === 'total' && <span className={style}>R$ {total?.toFixed(2)}</span>}
            {type === 'deliveryFee' && <span className={style}>R$ {deliveryFee?.toFixed(2)}</span>}
        </>
    )
}