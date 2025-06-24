/**Esse componente possui componentes internos */

import Image from "next/image"
import { Trash2 } from "lucide-react";
import { useCartContext } from "../../../../../../context/cartContext";
import { useState } from "react";
import { getImageSourceType } from "../../../../../../utils/helperFunctions";
import QuantityButton from "@/components/globalComponents/quantitySelector/QuantityButton";


interface CartProps {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    quantity?: number
}

export function CardItem({ id, name, imageUrl, price, quantity }: CartProps) {

    const { removeCartItem } = useCartContext()

    const [animation, setAddAnimation] = useState(false)

    function animateCard(id: string) {

        setAddAnimation(true)

        setTimeout(() => {
            removeCartItem(id)
        }, 500)
    }


    return (
        <div className={`flex p-2 gap-x-2 border-1 border-gray-300 h-25 rounded-lg transition-transform 
            duration-200 ease-in-out ${animation && 'translate-x-[100%]'}`}>
            <Image
                src={getImageSourceType(imageUrl)}
                alt="food"
                width={120}
                height={120}
                className="rounded-lg"
                style={{ objectFit: 'cover' }}
            />
            <div className=" text-[clamp(0.9rem,1vw,1.5rem)] flex flex-col justify-between w-full">
                <TitleCard />
                <PriceCard />
            </div>
        </div>
    );


    function TitleCard() {
        return (
            <div className="flex items-center justify-between">
                <p className="font-bold text text-[clamp(1rem,1em,2rem)]">{`${name[0].toUpperCase() + name.slice(1)}`}</p>
                {/* <span className="mr-1">{quantity && `x${quantity}`}</span> */}
            </div>
        )
    }

    function PriceCard() {
        return (
            <div className="flex items-center justify-between">
                <span className="text-orange-400 font-semibold text-[clamp(1rem,1em,2rem)]">R$ {price?.toFixed(2)} <span className="text-gray-800 font-normal ml-2">{quantity && `x${quantity}`}</span> </span>
                <Trash2
                    size={22}
                    onClick={() => animateCard(id)} className="cursor-pointer mr-1" />
            </div>
        )
    }
}

