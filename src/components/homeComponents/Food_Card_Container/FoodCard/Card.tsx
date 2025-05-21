"use client"

import Image from "next/image";

import { GiSodaCan } from "react-icons/gi";


import { useEffect, useState } from "react";

import { FoodCardProps } from "../../../../../utils/types/types";
import { SizeIndicator } from "../modalFood/sizeIndicator/SizeIndicator";

import { useCartContext } from "../../../../../context/cartContext";


export function FoodCard({ id, name, imageUrl, sizes, category, description }: FoodCardProps) {

    const [price, setPrice] = useState<number>()
    const [sizeDishName, setSizeDishName] = useState<string>('Mini')


    useEffect(() => {
        if (sizes.length >= 2) {
            sizes.map(item => {
                item.type === sizeDishName && setPrice(item.price)
            })
        } else {
            setPrice(sizes[0]?.price)
            setSizeDishName(sizes[0].type)
        }

    }, [sizes, sizeDishName])

    return (
        <div className={`foodCardStyle gap-x-2`}>
            <div className="relative w-50 h-35 flex justify-center order-2 rounded-lg">
                <Image
                    src={`/${imageUrl}`}
                    alt={name}
                    fill
                    className="rounded-lg"
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="flex flex-col justify-between grow text-start">
                {category !== 'Combos com Coca' && <h3 className={`text-[clamp(1rem,1.3vw,2rem)] font-semibold leading-5 break-words h-5 max-w-80 line-clamp-3`}>{name}</h3>}

                {category === 'Combos com Coca' &&
                    <h3 className={`text-[clamp(1rem,1.3vw,2rem)] font-semibold leading-5 break-words h-5 max-w-80 line-clamp-3`}>{name} + Coca</h3>}
                <p className="max-w-80 text-[clamp(0.8rem,1vw,2rem)] text-gray-500 h-15 line-clamp-3">{description}</p>

                <div className="flex justify-between items-center py-1">
                    {<p className={`text-lg font-bold TextColor`}>
                        R$ {price?.toFixed(2)}<span className="text-gray-400 text-[11px] ml-1 font-normal">{sizeDishName}</span>
                    </p>}
                    {/* <SizeIndicator
                        icon={GiHotMeal}
                        sizes={sizes}
                        sizeDishName={sizeDishName}
                        setSizeDishName={setSizeDishName}
                        category={category}
                    /> */}
                </div>

                {/* <button onClick={() => {
                    addToCart({ id, name, price, sizeDishName, imageUrl })
                }}
                    className={`button_primary_medium w-full flex justify-center mt-2`}>
                    <MdAddShoppingCart />
                </button> */}
            </div>
        </div>
    );
}
