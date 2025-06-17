'use client'

import { CategoryContextProvider } from "../../context/categoryContext";
import { ModalProvider } from "../../context/modalContext";
import { WarningModalProvider } from "../../context/warningModalContext";

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <CategoryContextProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </CategoryContextProvider>
    )
}
