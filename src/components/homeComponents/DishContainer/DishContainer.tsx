
import FoodGridTitle from "./FoodGridTitle/FoodGridTitle"
import FoodGrid from "./FoodGrid/FoodGrid"

import foodModel from "../../../../model/foodModel"
import { dbConnect } from "../../../../db/dbConnection"
import { DishesProps } from "../../../../utils/types/types"



export async function DishesContainer() {
    const res = await fetch('http://localhost:3000/api/cardapio')
    const menu = res.json()

    // await dbConnect()
    // const menu = await foodModel.find()

    // console.log(menu[0])

    // const parsed = menu.map(item => ({
    //     ...item.toObject(),
    //     id: item._id.toString(),
    // }));

    return (
        <div className="min-h-150">
            <FoodGridTitle />
            {/* <FoodGrid dishes={parsed} /> */}
            <FoodGrid menu={menu} />
        </div>
    )
}