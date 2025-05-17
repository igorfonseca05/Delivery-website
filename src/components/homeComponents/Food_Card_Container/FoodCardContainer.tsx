'use client'

import FoodCard from "./FoodCard/Card"

import { DishesProps } from "../../../../utils/types/types"
import { NotFoundData } from "@/components/globalComponents/notFoundData/notFound"

import { useFetchData } from "../../../../hooks/useFetch"

import { useCategoryContext } from "../../../../context/categoryContext"
import { GifLoading } from "../../globalComponents/loading_gif"
import { useEffect } from "react"
import { toast } from "react-toastify"
import CardsLoading from "@/components/globalComponents/cardsLoading/CardsLoading"


export function DishesContainer() {

    const { category } = useCategoryContext()

    const url = category === 'Todos' ?
        `http://localhost:5000/cardapio` :
        `http://localhost:5000/cardapio?category=${category}`

    const { data: dishes, loading, error } = useFetchData(url)

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <>
            <h1 className="capitalize text-2xl mb-3 font-medium">{category || "Todos"}</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 min-h-150 m-auto relative">
                {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))}
                {!loading && dishes?.map(item => (
                    <FoodCard key={item.id} name={item.name} imageUrl={item.image} sizes={item.sizes} />
                ))}
                {!dishes && <NotFoundData text='Dados não encontrados' />}
            </div>
        </>
    )
}