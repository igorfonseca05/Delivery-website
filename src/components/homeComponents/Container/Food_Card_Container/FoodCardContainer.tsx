

import FoodCard from "./FoodCard/Card"
import Image from "next/image"

import { DishesProps } from "../../../../../utils/types/types"
import { NotFoundData } from "@/components/notFoundData/notFound"


export function DishesContainer({ dishes }: { dishes: DishesProps[] }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 m-auto relative">
            {dishes?.map(item => (
                <FoodCard key={item.id} name={item.name} imageUrl={item.image} sizes={item.sizes} />
            ))
            }

            {!dishes && <NotFoundData text='Dados não encontrados' />}

        </div>
    )
}