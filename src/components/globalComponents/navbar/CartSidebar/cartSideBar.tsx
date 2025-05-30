'use client'

import Image from "next/image"
import Link from "next/link"
import { useAuthContext } from "../../../../../context/useAuthContext"

// import { MdClose } from "lucide-react"
import { PricesCart } from "./cartFooterTotal/cartFooter"
import { HeaderCart } from "./cardHeader"

import { useState } from "react"
import { useToggleCartContext } from "../../../../../context/toggleCartContext"
import { CardItem } from "./card_sidebar/card_SideBar"
import { useWarningModalContext } from "../../../../../context/warningModalContext"

import { useCartContext } from "../../../../../context/cartContext"
import { GuestCheckoutWarning } from "../../warningModal/WarningModal"
import { useRouter } from "next/compat/router"

export function CartSideBar() {

    const router = useRouter()

    const { cartIsOpen, setCartIsOpen } = useToggleCartContext()
    const { cartItensArray } = useCartContext()
    const { user } = useAuthContext()
    const { isOpen, setIsOpen } = useWarningModalContext()

    return (
        <div className={`fixed right-0 p-4 py-3 h-full z-2 w-full lg:w-90 bg-white
         ${cartIsOpen ? 'cardIsOpen shadow-md' : 'cardIsClose'}`}>
            <div className="flex flex-col h-full  justify-between">

                <HeaderCart />

                {/* Messagem de aviso "carrinho vazio" */}
                {cartItensArray.length === 0 &&
                    (<div className="m-auto text-center">
                        <Image src={`/empty.svg`} alt="logo carrinho vazio" priority quality={50} width={200} height={200} className="opacity-40 mb-4" />
                        <p>Seu carrinho está vazio</p>
                        <span className="text-sm text-gray-500">Adicione itens</span>
                    </div>)
                }

                {/* Produtos caso carrinho não esteja vazio */}
                {cartItensArray.length !== 0 &&
                    (<>
                        <div className=" flex flex-col grow-2 mt-4 rounded-lg gap-y-2 overflow-y-auto cartScroll">
                            {cartItensArray && cartItensArray?.map(({ id, name, price, imageUrl, quantity }) => (
                                <CardItem
                                    key={id}
                                    id={id}
                                    name={name}
                                    price={price}
                                    imageUrl={imageUrl}
                                    quantity={quantity} />
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-y-2">
                            <PricesCart />
                            {user && <Link href={'/payment'}
                                className="button_primary_medium bg-[#df4f4b] w-full mt-2 text-center"
                                onClick={() => setCartIsOpen(false)}>
                                Finalizar pedido
                            </Link>}
                            {!user && <button
                                className="button_primary_medium bg-[#df4f4b] w-full mt-2 text-center"
                                onClick={() => {
                                    setIsOpen(true)
                                    setCartIsOpen(false)
                                }}>
                                Finalizar pedido
                            </button>}
                        </div>
                    </>)
                }

            </div>

        </div>
    )
}