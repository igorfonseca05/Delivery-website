import React, { useState } from "react";

import { FaShippingFast } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";

interface GetOrderProps {
    order?: number
    getOrder?: number
    setGetOrder: (getOrder: number) => void,
    message: string
}

export default function GetOrderContainer({
    setGetOrder,
    message,
    order }:
    GetOrderProps) {

    const [isGetOrderSelected, setIsGetOrderSelected] = useState(order)

    let buttons = [
        { id: 1, label: 'Entrega', icon: FaShippingFast },
        { id: 2, label: 'Retirar na loja', icon: MdPinDrop }
    ]


    function handleButtonsForm(id: number) {
        setGetOrder(id)

        setIsGetOrderSelected(id)
    }

    return (
        <div className='flex flex-col space-y-4 mb-4'>
            <p className='text-[clamp(1rem,1em,2rem)] font-extrabold mb-4'>{message}</p>
            <div className="flex gap-4 sm:flex-row">
                {
                    buttons?.map(({ id, label, icon: Icon }) => {
                        const getOrderSelected = isGetOrderSelected === id

                        return (
                            <button key={id}
                                className={` flex justify-center items-center py-2 border border-gray-300 rounded-lg gap-x-2 grow 
                                ${getOrderSelected ? 'opacity-100' : 'opacity-40'}`}
                                onClick={() => { handleButtonsForm(id) }}>

                                <Icon size={20} className="text-orange-400" />
                                <span className="min-w-25">{label}
                                    {id === 1 &&
                                        <span className="text-[12px] ml-1 font-bold">- Grátis</span>
                                    }
                                </span>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
};