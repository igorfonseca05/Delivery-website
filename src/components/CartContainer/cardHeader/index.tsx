
import { MdClose } from "react-icons/md"

interface ActionProps {
    cartIsOpen: boolean,
    setCartIsOpen: (cartIsOpen: boolean) => void
}

import { useCartContext } from "@/context/cartContext"

export function HeaderCart() {

    const { setCartIsOpen, cartIsOpen } = useCartContext()

    return (
        <div className="flex items-center gap-x-2 ">
            <MdClose className="text-xl cursor-pointer" onClick={() => setCartIsOpen(!cartIsOpen)} />
            <p className="w-full text-center text-lg">Seus itens</p>
        </div>
    )
}