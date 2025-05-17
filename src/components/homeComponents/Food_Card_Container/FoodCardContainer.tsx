'use client'

import { NotFoundData } from "@/components/globalComponents/notFoundData/notFound"
import { useFetchData } from "../../../../hooks/useFetch"
import { useCategoryContext } from "../../../../context/categoryContext"
import { useEffect } from "react"
import { toast } from "react-toastify"

import FoodCard from "./FoodCard/Card"
import CardsLoading from "@/components/globalComponents/cardsLoading/CardsLoading"


export function DishesContainer() {

    const { category } = useCategoryContext()

    // Gerando URL dinâmicamente
    const url = category === 'Todos' ?
        `http://localhost:5000/cardapio` :
        `http://localhost:5000/cardapio?category=${category}`

    // Buscando dados
    const { data: dishes, loading, error } = useFetchData(url)

    // Capturando erro de fetch
    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <>
            <h1 className="capitalize text-2xl mb-3 font-medium">{category || "Todos"}</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 min-h-150 m-auto relative">

                {/* Cards de loading */}
                {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))}

                {/* Pratos disponiveis */}
                {!loading && dishes?.map(item => (
                    <FoodCard key={item.id} name={item.name} imageUrl={item.image} sizes={item.sizes} />
                ))}
                {!dishes && <NotFoundData text='Dados não encontrados' />}
            </div>
        </>
    )
}