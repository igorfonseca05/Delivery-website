'use client'

// Contexts
import { useToggleCartContext } from "../../../../../context/toggleCartContext"
import { useCartContext } from "../../../../../context/cartContext"

// Components
import Overlay from "../../Overlay/Overlay"
import { HeaderCart } from "./Header"
import ImageEmptyCart from "./Image/Image"
import { default as CardBody } from "./Body/Body"
import { PricesCart as Footer } from "./Footer/cartFooter"
import { useEffect } from "react"

export function CartSideBar() {

    const { cartIsOpen } = useToggleCartContext()
    const { cartItensArray } = useCartContext()

    const emptyCart = cartItensArray.length === 0

    useEffect(() => {
        cartIsOpen ?
            (document.body.style.overflowY = 'hidden') :
            (document.body.style.overflowY = 'auto')
    }, [cartIsOpen])

    return (
        <Overlay isOpen={cartIsOpen}>
            <div className={`fixed right-0 px-4 py-2 pb-4 h-full z-2 w-[88%] lg:w-90 bg-white
                ${cartIsOpen ? 'cardIsOpen shadow-md' : 'cardIsClose'}`}>

                <div className="flex flex-col h-full  justify-between">
                    <HeaderCart />
                    {emptyCart && <ImageEmptyCart />}
                    {!emptyCart &&
                        <>
                            <CardBody />
                            <Footer />
                        </>
                    }
                </div>
            </div>
        </Overlay>
    )
}