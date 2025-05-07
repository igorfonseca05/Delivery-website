'use client'

import { ReactNode } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";

export function LoadingPage({ children }: { children: ReactNode }) {

    const { status } = useSession()

    return (
        status === 'loading' ? (
            <div className="h-screen flex flex-col justify-center items-center">
                <Image src='/gif.gif' alt="Logo Paraiso da gastronomia" width={100} height={100} />
                <p>Carregando, aguarde!...</p>
            </div>
        ) :
            (<section>
                {children}
            </section >)
    )
}