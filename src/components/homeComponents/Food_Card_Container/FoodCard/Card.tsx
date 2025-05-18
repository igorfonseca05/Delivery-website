"use client"

import Image from "next/image";

import { MdAddShoppingCart } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";


import { useEffect, useState } from "react";

import { FoodCardProps } from "../../../../../utils/types/types";
import { SizeIndicator } from "./sizeIndicator/SizeIndicator";

import { useCartContext } from "../../../../../context/cartContext";


export default function FoodCard({ id, name, imageUrl, sizes, category }: FoodCardProps) {
    const { addToCart } = useCartContext()

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
        <div className={`foodCardStyle`}>
            <div className="relative w-full h-35 flex justify-center">
                <Image
                    src={`/${imageUrl}`}
                    alt={name}
                    fill
                    className="rounded-lg"
                    style={{ objectFit: 'contain' }}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="flex flex-col justify-between">
                <h3 className={`text-lg font-semibold leading-5 break-words mt-2 h-5 whitespace-nowrap overflow-hidden text-ellipsis`}>{name}</h3>
                <div className="flex justify-between items-center py-1">
                    {<p className={`text-lg font-bold text-[#ffb443]`}>
                        R$ {price?.toFixed(2)}
                    </p>}
                    <SizeIndicator
                        icon={GiHotMeal}
                        sizes={sizes}
                        sizeDishName={sizeDishName}
                        setSizeDishName={setSizeDishName}
                        category={category}
                    />
                </div>

                <button onClick={() => {
                    addToCart({ id, name, price, sizeDishName, imageUrl })
                }}
                    className={`button_primary_medium w-full flex justify-center mt-2`}>
                    <MdAddShoppingCart />
                </button>
            </div>
        </div>
    );
}
