"use client"

import Image from "next/image";

import { MdAddShoppingCart } from "react-icons/md";


import { useState } from "react";

import { FoodCardProps } from "../../../../../utils/types/types";

export default function FoodCard({ name, imageUrl, sizes }: FoodCardProps) {

    const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false)

    return (
        <div className={`foodCardStyle`} onClick={() => setInfoIsOpen(!infoIsOpen)}>
            <div className="flex relative aspect-[3/2] justify-center">
                <Image
                    src={`/${imageUrl}`}
                    alt={name}
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
            </div>
            <div className="flex flex-col justify-between">
                <h3 className={`text-lg font-semibold leading-5 break-words mt-2 h-5 ${!infoIsOpen ? " whitespace-nowrap overflow-hidden text-ellipsis" : ''}`}>{name}</h3>

                {sizes.length >= 2 ? (
                    (() => {
                        const mini = sizes.find(item => item.type === 'Mini');
                        return mini ? (
                            <p key={mini.id} className="text-sm font-bold my-2 text-orange-500">
                                R$ {mini.price.toFixed(2)}
                            </p>
                        ) : null;
                    })()
                ) : (
                    <p key={sizes[0].id} className="text-sm font-bold my-2 text-orange-500">
                        R$ {sizes[0].price.toFixed(2)}
                    </p>
                )}
                {/* <Dish_Info infoIsOpen={infoIsOpen} setInfoIsOpen={setInfoIsOpen} /> */}
                <button className={`button_primary_medium w-full flex justify-center mt-2`}>
                    <MdAddShoppingCart />
                </button>
                {/* <Counter showCounter={addCount} /> */}

            </div>
        </div>
    );
}
