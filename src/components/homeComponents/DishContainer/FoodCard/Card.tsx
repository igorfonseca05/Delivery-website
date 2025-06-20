import Image from "next/image";

import { useEffect, useState } from "react";
import { FoodCardProps } from "../../../../../utils/types/types";
import { upperCaseText } from "../../../../../utils/helperFunctions";

export function FoodCard({ _id, name, imageUrl, sizes, category, description }: FoodCardProps) {

    const [price, setPrice] = useState<number>(0)
    const [sizeDishName, setSizeDishName] = useState<string>('mini')

    /** Nesse useEffect eu verifico quais pratos possuem mais de um tamanho
     * disponivel e escolho o valor do menor deles como padrão para o card.
    */
    useEffect(() => {
        const thereMoreThanOne = sizes.length >= 2

        if (thereMoreThanOne) {
            sizes.map(({ type, price }) => {
                type === sizeDishName && setPrice(price)
            })
        } else {
            setPrice(sizes[0]?.price)
            setSizeDishName(sizes[0].type)
        }

    }, [sizes, sizeDishName])

    return (
        <div className={`foodCardStyle gap-x-2 cardAnimate`}>
            <div className="relative w-35 h-35 flex justify-center order-2 rounded-lg">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="rounded-lg"
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="flex flex-col justify-between grow text-start">
                <h3 className={`text-[clamp(1.1rem,1.3vw,2rem)] font-semibold text-[#212026] leading-5 break-words h-5 max-w-80 line-clamp-3`}>{upperCaseText(name)}</h3>

                <p className="max-w-80 text-[clamp(0.8rem,1vw,2rem)] text-gray-500 h-15 line-clamp-3">{upperCaseText(description)}</p>

                <div className="flex justify-between items-center py-1">
                    <p className={`text-lg font-bold TextColor`}>
                        R$ {price?.toFixed(2)}<span className="text-gray-400 text-[11px] ml-1 font-normal hidden">{sizeDishName}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
