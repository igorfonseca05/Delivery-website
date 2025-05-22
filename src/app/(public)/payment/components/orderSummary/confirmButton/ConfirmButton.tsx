'use client'

import { useCartContext } from "../../../../../../../context/cartContext"

export function ConfirmButton() {

    const { total } = useCartContext()



    return (
        <>
            {total !== 0 && <button className="w-full button_primary_large disabled:bg-amber-200 disabled:cursor-not-allowed  text-white font-semibold py-3 rounded-lg transition">
                Confirmar pedido
            </button>}
            {total === 0 && <button title="Adicione itens ao carrinho" className="w-full bg-orange-300  cursor-not-allowed  text-white font-semibold py-3 rounded-lg transition">
                Confirmar pedido
            </button>}
        </>
    )
}