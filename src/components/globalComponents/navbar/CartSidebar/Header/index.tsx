
import { X } from "lucide-react"
import { useToggleCartContext } from "../../../../../../context/toggleCartContext"

export function HeaderCart() {

    const { setCartIsOpen, cartIsOpen } = useToggleCartContext()

    return (
        <div className="flex items-center gap-x-2  p-2 rounded-lg">
            <X className="cursor-pointer size-6" onClick={() => setCartIsOpen(!cartIsOpen)} />
            <p className="w-full text-center text-lg">Seu carrinho</p>
        </div>
    )
}