"use client"


import Image from "next/image";

import { MdAddShoppingCart } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";


import { useEffect, useState } from "react";

import { FoodCardProps } from "../../../../../utils/types/types";
import { SizeIndicator } from "./sizeIndicator/SizeIndicator";

export default function FoodCard({ name, imageUrl, sizes }: FoodCardProps) {

    const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false)
    const [price, setPrice] = useState<number>()
    const [sizeDishName, setSizeDishName] = useState<string>('Mini')


    useEffect(() => {
        if (sizes.length >= 2) {
            sizes.map(item => {
                item.type === sizeDishName && setPrice(item.price)
            })
        } else {
            setPrice(sizes[0]?.price)
        }

    }, [sizes, sizeDishName])

    return (
        <div className={`foodCardStyle`} onClick={() => setInfoIsOpen(!infoIsOpen)}>
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

                {/* Sizes são arrays que armazenam os tamanhos 
                pequeno, médio e grande disponiveis para o prato*/}
                {/* {sizes.length >= 2 ? (
                    (() => {
                        const mini = sizes.find(item => item.type === 'Mini');
                        return mini ? (
                            <p key={mini.id} className="text-sm font-bold my-2 text-orange-500">
                                R$ {mini.price?.toFixed(2)}
                            </p>
                        ) : null;
                    })()
                ) : (
                    <p key={sizes[0].id} className="text-sm font-bold my-2 text-orange-500">
                        R$ {sizes[0].price?.toFixed(2)}
                    </p>
                )} */}

                <div className="flex justify-between items-center py-1">
                    {<p className={`text-lg font-bold text-orange-500`}>
                        R$ {price?.toFixed(2)}
                    </p>}
                    <SizeIndicator
                        icon={GiHotMeal}
                        sizes={sizes}
                        sizeDishName={sizeDishName}
                        setSizeDishName={setSizeDishName} />
                </div>

                <button className={`button_primary_medium w-full flex justify-center mt-2`}>
                    <MdAddShoppingCart />
                </button>
                {/* <Counter showCounter={addCount} /> */}

            </div>
        </div>
    );
}
