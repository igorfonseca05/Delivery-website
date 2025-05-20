
import { useEffect, useState } from "react"
import { useCartContext } from "../../../../../../context/cartContext"

export function PricesCart() {

    const { cartItensArray } = useCartContext()

    const [total, setTotal] = useState<number>(0)
    const deliveryFee = 9

    useEffect(() => {

        cartItensArray.reduce((acc, item) => {
            if (!item.quantity) return acc

            setTotal(acc + item.price * item.quantity)
            return 0

        }, 0)

    }, [cartItensArray])

    console.log(total)

    return (
        <>
            <hr className="border-gray-300 h-2 w-full" />
            <div className="flex justify-between w-full">
                <p>Sub-total</p>
                <span>R$ {total}</span>
            </div>
            <div className="flex justify-between w-full">
                <p>Taxa de entrega</p>
                <span>R$ {deliveryFee}</span>
            </div>
            <hr className="border-gray-300 h-2 w-full" />
            <div className="flex justify-between w-full">
                <p className="text-xl">Total</p>
                <span>R$ {total + deliveryFee}</span>
            </div>
        </>
    )
}