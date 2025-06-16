'use client'

import { CategoryContextProvider } from "../../context/categoryContext";
import { ModalProvider } from "../../context/modalContext";
import { WarningModalProvider } from "../../context/warningModalContext";

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <WarningModalProvider>
            <ModalProvider>
                <CategoryContextProvider>
                    {children}
                </CategoryContextProvider>
            </ModalProvider>
        </WarningModalProvider>
    )
}
