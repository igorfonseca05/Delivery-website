
import { MdClose } from "react-icons/md"

interface ActionProps {
    cartIsOpen: boolean,
    setCartIsOpen: (cartIsOpen: boolean) => void
}

import { useToggleCartContext } from "../../../../../../context/toggleCartContext"

export function HeaderCart() {

    const { setCartIsOpen, cartIsOpen } = useToggleCartContext()

    return (
        <div className="flex items-center gap-x-2  p-2 rounded-lg">
            <MdClose className="cursor-pointer size-6" onClick={() => setCartIsOpen(!cartIsOpen)} />
            <p className="w-full text-center text-lg">Seu carrinho</p>
        </div>
    )
}