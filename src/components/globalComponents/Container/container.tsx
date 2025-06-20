'use client'

import React, { useEffect } from "react";


export function ContentContainer({ children }: { children: React.ReactNode }) {

    return (
        <section className={`alignAllContent sizeContentet min-h-160 p-3 text-justify pt-13 overflow-hidden`}>
            {children}
        </section>
    )
}