'use client'

import Image from "next/image"
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { useCartContext } from "../../../../../../context/cartContext";

export function CardItem() {

    const { cartItensArray } = useCartContext()

    console.log(cartItensArray)

    const [count, setCount] = useState(1);

    const decrement = () => {
        if (count > 1) setCount(count - 1);
    };

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div className="flex p-2 gap-x-2">
            <Image
                src='/1.jpg'
                alt="food"
                width={75}
                height={75}
                className="rounded-lg"
            />
            <div className=" flex flex-col justify-between w-full">
                <div className="flex items-center justify-between">
                    <p>Food</p>
                    <span>R$ 78.22</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-lg px-1 bg-white shadow-sm">
                        <button
                            onClick={decrement}
                            className="text-gray-500 hover:text-black px-1 text-sm"
                        >
                            -
                        </button>
                        <span className="px-2 text-sm font-medium">{count}</span>
                        <button
                            onClick={increment}
                            className="text-gray-500 hover:text-black px-1 text-sm"
                        >
                            +
                        </button>
                    </div>
                    <FaTrashAlt />
                </div>

            </div>
        </div>
    )
}