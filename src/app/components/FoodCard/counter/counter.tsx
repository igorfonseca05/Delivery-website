"use client"

import { useState } from "react";

export function Counter() {
    const [quantidade, setQuantidade] = useState(1);

    const increment = () => setQuantidade(prev => prev + 1);
    const decrement = () => setQuantidade(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="flex items-center justify-between mt-2 w-[110px] bg-orange-400 text-white font-bold rounded-lg overflow-hidden">
            <button
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center text-xl hover:bg-orange-500 transition"
            >
                -
            </button>
            <span className="w-8 text-center">{quantidade}</span>
            <button
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center text-xl hover:bg-orange-500 transition"
            >
                +
            </button>
        </div>

    )
}