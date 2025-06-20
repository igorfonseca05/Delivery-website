
import FoodGridTitle from "./FoodGridTitle/FoodGridTitle"
import FoodGrid from "./FoodGrid/FoodGrid"

import foodModel from "../../../../model/foodModel"
import { dbConnect } from "../../../../db/dbConnection"
import { DishesProps } from "../../../../utils/types/types"

export async function DishesContainer() {


    return (
        <div className="min-h-150">
            <FoodGridTitle />
            <FoodGrid />
        </div>
    )
}