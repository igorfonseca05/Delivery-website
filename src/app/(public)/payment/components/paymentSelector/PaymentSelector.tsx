import { Truck, Store, CreditCard } from "lucide-react"
import { FaPix } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

interface PaymentSeletorProps {
    step: number,
    setStep: (step: number) => void
    order?: number
    paymentMethod?: number
    setPaymentMethod: (paymentMethod: number) => void,
    type: string,
    message: string
}

export default function PaymentSeletor({
    step,
    setStep,
    setPaymentMethod,
    paymentMethod,
    type,
    message,
    order }:
    PaymentSeletorProps) {

    const [isPaymentSelected, setIsPaymentSelected] = useState(paymentMethod)

    const [buttons, setButtons] = useState([
        { id: 3, label: 'Cartão de crédito', icon: `cartao.svg` },
        { id: 4, label: 'Pix', icon: 'pix.svg' }
    ])

    function handleButtonsForm(id: number) {
        setPaymentMethod(id)
        setIsPaymentSelected(id)

        // id === 4 && setStep(3)
    }

    return (
        <div className='flex flex-col space-y-4 mb-4'>
            <p className='text-[clamp(1rem,1em,2rem)] font-extrabold mb-4'>{message}</p>
            <div className="flex gap-4 sm:flex-row">
                {
                    buttons?.map(({ id, label, icon }) => {
                        const paymentSelected = isPaymentSelected === id

                        return (
                            <button key={id}
                                className={`flex border border-gray-200 p-2 rounded-lg items-center justify-center gap-x-2 grow 
                                ${paymentSelected ? 'opacity-100' : 'opacity-50'}`}
                                onClick={() => { handleButtonsForm(id) }}>

                                <figure className="w-8 h-8 flex justify-center items-center">
                                    <img src={`/${icon}`} className="w-full" alt="" />
                                </figure>
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
        // <div className='flex flex-col space-y-4 mb-4'>
        //     <p className='text-[clamp(1rem,1em,2rem)] font-extrabold mb-4'>{message}</p>
        //     <div className="flex flex-col gap-4 sm:flex-row">
        //         {
        //             buttons?.map(({ id, label, icon: Icon }) => {
        //                 const paymentSelected = isPaymentSelected === id

        //                 return (
        //                     <button key={id}
        //                         className={`flex button_neutral_large  gap-x-4 grow 
        //                         ${paymentSelected ? 'opacity-100' : 'opacity-50'}`}
        //                         onClick={() => { handleButtonsForm(id) }}>

        //                         <Icon className="w-5 h-5 text-orange-400" />
        //                         <span className="min-w-25 text-start">{label}
        //                             {id === 1 &&
        //                                 <span className="text-[12px] ml-1 font-bold">- Grátis</span>
        //                             }
        //                         </span>
        //                     </button>
        //                 )
        //             })
        //         }
        //     </div>
        // </div>
    );
};