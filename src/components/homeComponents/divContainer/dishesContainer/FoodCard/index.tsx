"use client"

import Image from "next/image";

import { MdAddShoppingCart } from "react-icons/md";

import { Dish_Info } from "./infos/infos";
import { Counter } from "./counter/counter";
import { useState } from "react";

interface FoodCardProps {
    name: string;
    imageUrl: string;
    sizes: [
        {
            type: string,
            price: number,
            id: number
        }
    ]
}

export default function FoodCard({ name, imageUrl, sizes }: FoodCardProps) {

    const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false)
    const [addCount, setaddCount] = useState<boolean>(false)

    return (
        <div className={`foodCardStyle`} onClick={() => setInfoIsOpen(!infoIsOpen)}>
            <div className="flex relative aspect-[3/2] justify-center">
                <Image
                    src={`/${imageUrl}`}
                    alt={name}
                    fill
                    className="rounded-lg object-cover"
                />
            </div>
            <div className="flex flex-col justify-between">
                <h3 className={`"text-base font-semibold leading-5 break-words mt-2 h-5" ${!infoIsOpen ? " whitespace-nowrap overflow-hidden text-ellipsis" : ''}`}>{name}</h3>

                {sizes.length >= 2 ? (
                    (() => {
                        const mini = sizes.find(item => item.type === 'Mini');
                        return mini ? (
                            <p key={mini.id} className="text-sm font-bold my-1 text-orange-500">
                                R$ {mini.price.toFixed(2)}
                            </p>
                        ) : null;
                    })()
                ) : (
                    <p key={sizes[0].id} className="text-sm font-bold my-1 text-orange-500">
                        R$ {sizes[0].price.toFixed(2)}
                    </p>
                )}
                {/* <Dish_Info infoIsOpen={infoIsOpen} setInfoIsOpen={setInfoIsOpen} /> */}
                <button className={`buttonStyle w-full flex justify-center mt-2 buttonHover`}>
                    <MdAddShoppingCart />
                </button>
                {/* <Counter showCounter={addCount} /> */}

            </div>
        </div>
    );
}
