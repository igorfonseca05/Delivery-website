'use client'

import React, { useEffect } from "react";


export function ContentContainer({ children }: { children: React.ReactNode }) {

    return (
        <section className={`alignAllContent sizeContent min-h-160 p-3 text-justify pt-13`}>
            {children}
        </section>
    )
}