
import { Suspense } from "react"
import FoodCard from "./FoodCard"

import { DishesProps } from "../../../../../utils/types/types"

async function getDishes() {
    try {
        const res = await fetch('http://localhost:5000/cardapio')

        if (!res.ok) throw new Error('Error ao obter dados')

        return res.json()

    } catch (error) {
        console.log(error)
    }
}


export async function DishesContainer() {

    const dishes: DishesProps[] = await getDishes()

    // console.log(dishes)

    return (
        <div className="flex flex-wrap gap-5 m-auto relative">
            {
                dishes.map(item => (
                    <FoodCard key={item.id} name={item.name} imageUrl={item.image} sizes={item.sizes} />
                ))
            }

        </div>
    )
}