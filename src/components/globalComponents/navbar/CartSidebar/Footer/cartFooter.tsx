
import { useEffect, useState } from "react"
import { useCartContext } from "../../../../../../context/cartContext";
import { User } from "firebase/auth";
import { useAuthContext } from "../../../../../../context/useAuthContext";
import { useToggleCartContext } from "../../../../../../context/toggleCartContext";
import { useWarningModalContext } from "../../../../../../context/warningModalContext";

import Link from "next/link";

export function PricesCart() {

    const { setCartIsOpen } = useToggleCartContext()
    const { user } = useAuthContext()
    const { setIsOpen: setWarningModalIsOpen } = useWarningModalContext()
    const {
        cartItensArray,
        setTotal,
        total,
        setDeliveryFee,
        setTotalCartItens,
        totalCartItens
    } = useCartContext()


    // const [totalCartItens, setTotalCartItens] = useState<number>(0)
    const deliveryFee = 6
    const subTotalFontSize = 'text-[clamp(1.1rem,1em,2rem)]'


    // Adicionando taxa ao contexto
    useEffect(() => {
        setDeliveryFee(deliveryFee)
    }, [])

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
                <p className={subTotalFontSize}>Sub-total</p>
                <span className={subTotalFontSize}>R$ {totalCartItens.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full">
                <p className={subTotalFontSize}>Taxa de entrega</p>
                <span className={subTotalFontSize}>R$ {deliveryFee.toFixed(2)}</span>
            </div>
            <hr className="border-gray-200 h-2 w-full" />
            <div className="flex justify-between w-full">
                <p className="text-[clamp(1.5rem,1em,2rem)]">Total</p>
                <span className="text-[clamp(1.5rem,1em,2rem)]">R$ {total.toFixed(2)}</span>
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