'use client'

import React, { useEffect } from "react";


export function ContentContainer({ children }: { children: React.ReactNode }) {

    return (
        <section className={`alignAllContent sizeContentet min-h-160 text-justify px-2 pt-13 overflow-hidden`}>
            {children}
        </section>
    )
}