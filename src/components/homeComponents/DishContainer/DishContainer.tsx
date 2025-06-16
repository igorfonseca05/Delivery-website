
import FoodGridTitle from "./FoodGridTitle/FoodGridTitle"
import FoodGrid from "./FoodGrid/FoodGrid"

import foodModel from "../../../../model/foodModel"
import { dbConnect } from "../../../../db/dbConnection"


export async function DishesContainer() {

    // await dbConnect()
    // const menu = await foodModel.find({})

    // console.log(menu)


    // Gerando URL dinâmicamente com base na categoria
    // const url = category === 'Todos' ?
    //     `http://localhost:5000/cardapio` :
    //     `http://localhost:5000/cardapio?category=${category}`

    // Buscando dados
    // const { data: dishes, error } = useFetchData(url)

    // const [clickedDish, setClickedDish] = useState<DishesProps>()
    // const [modalIsOpen, setModalIsOpen] = useState(false)

    // Capturando erro de fetch
    // useEffect(() => {
    //     error && toast.error(error)
    //     msgFromMessageContext && toast.error(msgFromMessageContext)

    //     setTimeout(() => {
    //         setError('')
    //     }, 2000)

    // }, [error, msgFromMessageContext])



    return (
        <>
            <div className="min-h-150">
                <FoodGridTitle />
                {/* <FoodGrid dishes={menu} /> */}
            </div>
        </>
        // <>
        //     {!isAdmin ? (
        //         <>
        //             <div className="min-h-150">
        //                 <FoodGridTitle />
        //                 <FoodGrid/>
        //             </div>
        //         </>
        //     ) : (
        //         <OrdersTable />
        //     )}
        // </>
    )
}