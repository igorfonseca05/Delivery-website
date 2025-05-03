"use client"

import { useState } from "react";

import { IoMdTrash } from "react-icons/io";

export function Counter({ showCounter }: { showCounter: boolean }) {
    const [quantidade, setQuantidade] = useState(1);

    const increment = () => setQuantidade(prev => prev + 1);
    const decrement = () => setQuantidade(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="flex items-center">
            <div className={`flex items-center justify-between mt-2 w-full text-white font-bold rounded-lg overflow-hidden ${showCounter ? "block" : 'hidden'}`}>
                <button
                    onClick={decrement}
                    className="w-8 h-8 flex items-center justify-center text-xl bg-orange-400 transition"
                >
                    -
                </button>
                <span className="w-8 text-center text-black bg-white">{quantidade}</span>
                <button
                    onClick={increment}
                    className="w-8 h-8 flex items-center justify-center text-xl bg-orange-400 transition"
                >
                    +
                </button>
            </div>
            {/* <IoMdTrash size={24} className={`${showCounter ? "block" : 'hidden'}`} /> */}
        </div>

    )
}