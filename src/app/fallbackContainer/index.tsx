'use client'

import Image from "next/image";

export function CustomLoadingPage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Image src='/gif.gif' alt="Logo Paraiso da gastronomia" width={100} height={100} />
            <p>Carregando, aguarde!...</p>
        </div>
    )
}