import { Truck, Store, CreditCard } from "lucide-react"
import { FaPix } from "react-icons/fa6";
import React, { useState } from "react";

interface GetOrderProps {
    getOrder?: string
    setGetOrder: (getOrder: string) => void,
    type: string,
    question: string
}

export default function GetOrderContainer({ setGetOrder, type, question }: GetOrderProps) {

    // const [buttonsInfo, setButtonsInfo] = useState<{ id: number, label: string, icon: React.ElementType }[]>([])

    let buttons

    if (type === 'address') {
        buttons = [
            { id: 1, label: 'Entrega', icon: Truck },
            { id: 2, label: 'Retirar na loja', icon: Store }
        ]
    }

    if (type === 'payment') {
        buttons = [
            { id: 1, label: 'Cartão de crédito', icon: CreditCard },
            { id: 2, label: 'Pix', icon: FaPix }
        ]
    }

    return (
        <div className='flex flex-col space-y-4 mb-4'>
            <p className='text-[clamp(1rem,1em,2rem)] font-extrabold mb-4'>Como você gostaria que obter seu pedido?</p>
            <div className="flex flex-col gap-4 sm:flex-row">
                {
                    buttons?.map(({ id, label, icon: Icon }) => (
                        <button key={id} className='button_neutral_large flex cursor-pointer gap-x-4 grow '
                            onClick={() => setGetOrder(`${label}`)}>
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="min-w-25 text-start">{label}</span>
                        </button>
                    ))
                }
            </div>
        </div>
    );
};