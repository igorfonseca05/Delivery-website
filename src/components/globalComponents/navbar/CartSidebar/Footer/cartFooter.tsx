
import { useEffect, useState } from "react"
import { useCartContext } from "../../../../../../context/cartContext";
import { User } from "firebase/auth";
import { useAuthContext } from "../../../../../../context/useAuthContext";
import { useToggleCartContext } from "../../../../../../context/toggleCartContext";
import { useWarningModalContext } from "../../../../../../context/warningModalContext";

import Link from "next/link";

export function PricesCart() {

    const {
        cartItensArray,
        setTotal,
        total,
        setDeliveryFee,
        setTotalCartItens,
        totalCartItens } = useCartContext()

    const { cartIsOpen, setCartIsOpen } = useToggleCartContext()
    const { user } = useAuthContext()
    const { setIsOpen: setWarningModalIsOpen } = useWarningModalContext()


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

        <div className="flex flex-col w-full items-center gap-y-2">
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

            {/* Um botão redireciona e outro mostra modal antes de redirecionar */}
            <div className="flex flex-col w-full items-center gap-y-2">
                {user ?
                    (<Link href={'/payment'}
                        className="button_primary_large w-full mt-2 text-center"
                        onClick={() => setCartIsOpen(false)}>
                        Finalizar pedido
                    </Link>) :
                    (<button
                        className="button_primary_large w-full mt-2 text-center"
                        onClick={() => {
                            setWarningModalIsOpen(true)
                            setCartIsOpen(false)
                        }}>
                        Finalizar pedido
                    </button>)}
            </div>
        </div>


    )
}