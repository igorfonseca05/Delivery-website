'use client'

import React, { useEffect } from "react";
import { useToggleCartContext } from "../../../../context/toggleCartContext";
import { useMenuContext } from "../../../../context/MenuContext";

export function ContentContainer({ children }: { children: React.ReactNode }) {

    return (
        <section className={`alignAllContent sizeContentet min-h-160 text-justify px-2 pt-10 sm:pt-13 overflow-hidden`}>
            {children}
        </section>
    )
}