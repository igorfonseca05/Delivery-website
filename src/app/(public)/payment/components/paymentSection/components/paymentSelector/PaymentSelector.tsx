import React, { useEffect, useState } from "react";

interface PaymentSeletorProps {
    paymentMethod?: number
    setPaymentMethod: (paymentMethod: number) => void,
    message: string
}

export default function PaymentSeletor({
    setPaymentMethod,
    paymentMethod,
    message
}:
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
    );
};