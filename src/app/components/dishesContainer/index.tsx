
import { Suspense } from "react"
import FoodCard from "../FoodCard"

interface DishesProps {
    id: number
    category: string
    name: string
    description: string
    price: number
    image: string
    quantity: number
}

async function getDishes() {
    try {

        // await new Promise((resolve, reject) => setTimeout(() => resolve('resolvida'), 10000))
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
        <div className="grid gap-3 md:grid-cols-5 p-3 basicStyle shadow-sm">
            {
                dishes.map(item => (
                    <FoodCard key={item.id} name={item.name} price={item.price} imageUrl={item.image} />
                ))
            }

        </div>
    )
}