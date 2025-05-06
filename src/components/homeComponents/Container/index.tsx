'use client'

import React from "react";
import { useCartContext } from "@/context/cartContext";
import { useMenuContext } from "@/context/MenuContext";

export function ContentContainer({ children }: { children: React.ReactNode }) {

    const { cartIsOpen } = useCartContext()
    const { isOpen } = useMenuContext()

    return (
        <section className={`alignAllContent max-w-300 pt-16 p-2 text-justify m-auto overflow-hidden`}>
            {children}
        </section>
    )
}