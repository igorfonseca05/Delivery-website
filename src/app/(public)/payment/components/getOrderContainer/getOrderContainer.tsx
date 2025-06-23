import { Truck, Store, CreditCard } from "lucide-react"
import { FaPix } from "react-icons/fa6";
import React, { useState } from "react";

interface GetOrderProps {
    step: number,
    order?: number
    getOrder?: number
    setGetOrder?: (getOrder: number) => void,
    paymentMethod?: number
    setPaymentMethod?: (paymentMethod: number) => void,
    type: string,
    message: string
}

export default function GetOrderContainer({
    step,
    setGetOrder,
    setPaymentMethod,
    paymentMethod,
    type,
    message,
    order }:
    GetOrderProps) {

    const [isGetOrderSelected, setIsGetOrderSelected] = useState(order)
    const [isPaymentSelected, setIsPaymentSelected] = useState(paymentMethod)

    let buttons

    if (type === 'address') {
        buttons = [
            { id: 1, label: 'Entrega', icon: Truck },
            { id: 2, label: 'Retirar na loja', icon: Store }
        ]
    }

    if (type === 'payment') {
        buttons = [
            { id: 3, label: 'Cartão de crédito', icon: CreditCard },
            { id: 4, label: 'Pix', icon: FaPix }
        ]
    }

    function handleButtonsForm(id: number) {
        type === "address" && setGetOrder && setGetOrder(id)
        type === "payment" && setPaymentMethod && setPaymentMethod(id)

        setIsGetOrderSelected(id)
        setIsPaymentSelected(id)
    }

    return (
        <div className='flex flex-col space-y-4 mb-4'>
            <p className='text-[clamp(1rem,1em,2rem)] font-extrabold mb-4'>{message}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
                {
                    buttons?.map(({ id, label, icon: Icon }) => {
                        const getOrderSelected = isGetOrderSelected === id
                        const paymentSelected = isPaymentSelected === id

                        return (
                            <button key={id}
                                className={`flex button_neutral_large  gap-x-4 grow 
                                ${getOrderSelected || paymentSelected ? 'opacity-100' : 'opacity-50'}`}
                                onClick={() => { handleButtonsForm(id) }}>

                                <Icon className="w-5 h-5 text-orange-400" />
                                <span className="min-w-25 text-start">{label}
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