'use client'

import React from "react";
import { useToggleCartContext } from "../../../../context/toggleCartContext";
import { useMenuContext } from "../../../../context/MenuContext";

export function ContentContainer({ children }: { children: React.ReactNode }) {

    const { cartIsOpen } = useToggleCartContext()
    const { isOpen } = useMenuContext()

    return (
        <section className={`alignAllContent sizeContentet min-h-160 text-justify px-2 pt-14 sm:pt-18 overflow-hidden`}>
            {children}
        </section>
    )
}