'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ModalContextType = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModalContext() {
    const context = useContext(ModalContext)
    if (!context) throw new Error('useModal must be used within a ModalProvider')
    return context
}
