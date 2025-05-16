"use client"

import FoodCard from "./FoodCard/Card"
import Image from "next/image"

import { CustomLoadingPage } from "@/app/fallbackContainer"

// async function getDishes() {

//     try {
//         const res = await fetch('http://localhost:5000/cardapio')

//         if (!res.ok) throw new Error('Error ao obter dados')

//         return res.json()

//     } catch (error) {
//         console.log(error)
//     }
// }

import { useFetchData } from "../../../../../hooks/useFetch"


export function DishesContainer() {

    const { data: dishes, loading, error } = useFetchData('http://localhost:5000/cardapio')

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 m-auto relative">
            {loading && <CustomLoadingPage />}
            {!loading &&
                (dishes ? (
                    dishes?.map(item => (
                        <FoodCard key={item.id} name={item.name} imageUrl={item.image} sizes={item.sizes} />
                    ))
                ) : (
                    <div className="basicStyle min-h-100 flex justify-center items-center flex-col">
                        <Image src={'/logoIcon.svg'} alt='Logo paraiso' width={100} height={100} className=" mb-2 opacity-30" />
                        <h1 className="text-2xl">Dados não encontrados</h1>
                    </div>
                )
                )
            }

        </div>
    )
}