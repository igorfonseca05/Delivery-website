'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type WarningModalContextProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const WarningModalContext = createContext<WarningModalContextProps | undefined>(undefined)

export function WarningModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <WarningModalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </WarningModalContext.Provider>
    )
}

export function useWarningModalContext() {
    const context = useContext(WarningModalContext)
    if (!context) throw new Error('useModal must be used within a ModalProvider')
    return context
}
