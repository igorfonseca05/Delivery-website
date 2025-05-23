
import { useEffect, useState } from "react"
import { useCartContext } from "../../../../../../context/cartContext"

export function PricesCart() {

    const {
        cartItensArray,
        setTotal,
        total,
        setDeliveryFee,
        setTotalCartItens,
        totalCartItens } = useCartContext()

    // const [totalCartItens, setTotalCartItens] = useState<number>(0)
    const deliveryFee = 6

    useEffect(() => setDeliveryFee(deliveryFee), [])

    // Calculating the Total
    useEffect(() => {
        const cartItensSum = cartItensArray?.reduce((acc, item) => {
            if (!item.quantity) return acc
            return acc + item.price * item.quantity
        }, 0)

        setTotalCartItens(cartItensSum)
    }, [cartItensArray])

    useEffect(() => {
        setTotal(totalCartItens + deliveryFee)
    }, [totalCartItens])

    return (
        <>
            <hr className="border-gray-200 h-2 w-full" />
            <div className="flex justify-between w-full">
                <p>Sub-total</p>
                <span>R$ {totalCartItens.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full">
                <p>Taxa de entrega</p>
                <span>R$ {deliveryFee.toFixed(2)}</span>
            </div>
            <hr className="border-gray-200 h-2 w-full" />
            <div className="flex justify-between w-full">
                <p className="text-xl">Total</p>
                <span>R$ {total.toFixed(2)}</span>
            </div>
        </>
    )
}