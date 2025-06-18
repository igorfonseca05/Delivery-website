'use client' // ← necessário para que useState e useContext funcionem

import { createContext, ReactNode, useContext, useState } from 'react'

interface CategoryProps {
    category: string
    setCategory: (category: string) => void
}

const CategoryContext = createContext<CategoryProps | undefined>(undefined)

export function CategoryContextProvider({ children }: { children: ReactNode }) {
    const [category, setCategory] = useState('Todos')

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategoryContext() {
    const context = useContext(CategoryContext)

    if (!context) {
        throw new Error('useCategoryContext deve ser usado dentro de um CategoryContextProvider')
    }

    return context
}
