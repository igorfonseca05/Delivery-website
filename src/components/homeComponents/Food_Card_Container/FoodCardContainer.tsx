'use client'

import { NotFoundData } from "@/components/globalComponents/notFoundData/notFound"
import { useFetchData } from "../../../../hooks/useFetch"
import { useCategoryContext } from "../../../../context/categoryContext"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useToggleCartContext } from "../../../../context/toggleCartContext"

import { FoodCard } from "./FoodCard/Card"
import { CardsLoading } from "@/components/globalComponents/cardsLoading/CardsLoading"
import Link from "next/link"


export function DishesContainer() {

    const { category } = useCategoryContext()
    const { cartIsOpen } = useToggleCartContext()

    // Gerando URL dinâmicamente com base na categoria
    const url = category === 'Todos' ?
        `http://localhost:5000/cardapio` :
        `http://localhost:5000/cardapio?category=${category}`

    // Buscando dados
    const { data: dishes, loading, error } = useFetchData(url)

    // Capturando erro de fetch
    useEffect(() => {
        error && toast.error(error)
    }, [])

    return (
        <>
            <h1 className="capitalize text-2xl mb-3 font-medium">{category || "Todos"}</h1>
            <div className={`grid grid-cols-1  md:grid-cols-[auto_auto] gap-5 relative animate ${cartIsOpen && "w-[78%]"}`}>

                {/* Cards de loading */}
                {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))}

                {/* Pratos disponiveis */}
                {!loading && dishes?.map((item, index) => (
                    <Link key={item.id} href={"#"}>
                        <FoodCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            imageUrl={item.image}
                            sizes={item.sizes}
                            category={item.category}
                            description={item.description}
                        />
                    </Link>
                ))}
                {!dishes && <NotFoundData text='Dados não encontrados' />}
            </div>
        </>
    )
}