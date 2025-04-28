"use client"

import React, { createContext, useContext, useState } from "react";

interface isOpenProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

interface MenuProvider {
    children: React.ReactNode
}


export const MenuContext = createContext<isOpenProps | undefined>(undefined)

export function MenuContextProvider({ children }: MenuProvider) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </MenuContext.Provider>
    )
}


export function useMenuContext() {

    const context = useContext(MenuContext)

    if (!context) {
        throw new Error('Contexto deve ser fornecido')
    }

    return context
}