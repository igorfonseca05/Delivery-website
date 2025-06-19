/**Esse componente possui componentes internos */

import Image from "next/image"
import { Trash2 } from "lucide-react";
import { useCartContext } from "../../../../../../context/cartContext";


interface CartProps {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    quantity?: number
}

export function CardItem({ id, name, imageUrl, price, quantity }: CartProps) {

    const { removeCartItem } = useCartContext()

    return (
        <div className="flex p-2 gap-x-2 cardSidebarColor rounded-lg grow max-h-fit">
            <Image
                src={`/${imageUrl}`}
                alt="food"
                width={75}
                height={75}
                className="rounded-lg"
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
                <p className="font-bold">{name}</p>
                <span className="mr-1">{quantity && `x${quantity}`}</span>
            </div>
        )
    }

    function PriceCard() {
        return (
            <div className="flex items-center justify-between">
                <span>R$ {price?.toFixed(2)} <span className="text-[11px]">Uni.</span> </span>
                <Trash2
                    size={22}
                    onClick={() => removeCartItem(id)} className="cursor-pointer mr-1" />
                {/* {path !== '/payment' &&
                        <Trash2
                            size={22}
                            onClick={() => removeCartItem(id)} className="cursor-pointer mr-1" />}
                    {path === '/payment' &&
                    } */}
            </div>
        )
    }
}

