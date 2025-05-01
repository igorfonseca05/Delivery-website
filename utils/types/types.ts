
export interface DishesProps {
    id: string
    category: string
    name: string
    description: string
    image: string
    sizes: [
        {
            type: string
            price: number
            id: number
        }
    ]
}