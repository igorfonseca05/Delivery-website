'use client'

import React from "react";
import { useCartContext } from "@/context/cartContext";

export function DivContainer({ children }: { children: React.ReactNode }) {

    const { cartIsOpen } = useCartContext()

    return (
        <section className={`alignAllContent max-w-300 pt-16 p-2 text-justify m-auto`}>
            {children}
        </section>
    )
}