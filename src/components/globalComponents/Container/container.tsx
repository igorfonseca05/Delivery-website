'use client'

import React from "react";
import { useToggleCartContext } from "../../../../context/toggleCartContext";
import { useMenuContext } from "../../../../context/MenuContext";

export function ContentContainer({ children }: { children: React.ReactNode }) {

    const { cartIsOpen } = useToggleCartContext()
    const { isOpen } = useMenuContext()

    return (
        <section className={`alignAllContent sizeContentet min-h-170 pt-16 p-2 text-justify overflow-hidden`}>
            {children}
        </section>
    )
}