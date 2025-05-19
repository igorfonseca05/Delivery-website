'use client'

import { useState, useEffect } from 'react'
import { DishesProps } from '../../../../../utils/types/types'

import { SizeIndicator } from './sizeIndicator/SizeIndicator'
import { GiHotMeal } from "react-icons/gi";
import { useModalContext } from '../../../../../context/modalContext';

interface FoodModalProps {
    modalIsOpen: boolean
    setModalIsOpen: (modalIsOpen: boolean) => void,
    clickedDish: DishesProps | undefined
}

export function FoodModal({ modalIsOpen, setModalIsOpen, clickedDish }: FoodModalProps) {

    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState<number>()
    const [sizeDishName, setSizeDishName] = useState<string>('Mini')

    if (!clickedDish) return

    const increase = () => setQuantity(q => q + 1)
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))


    useEffect(() => {

        if (clickedDish?.sizes.length >= 2) {
            clickedDish?.sizes.map(item => {
                item.type === sizeDishName && setPrice(item.price)
            })
        } else {
            setPrice(clickedDish?.sizes[0]?.price)
            setSizeDishName(clickedDish?.sizes[0].type)
        }

    }, [clickedDish?.sizes, sizeDishName])

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

    }, [modalIsOpen])



    return (
        <div className={`fixed inset-0 z-50 bg-black/60 flex items-center justify-center transition-all duration-300 ${modalIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}>
            {/* Modal */}
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl p-4 grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                {/* Botões de ícones no topo */}
                <div className="absolute top-4 right-4 flex gap-3 z-10">
                    {/* <button className="text-gray-600 hover:text-gray-800">
                        🛒
                    </button> */}
                    <button onClick={() => setModalIsOpen(!modalIsOpen)} className="text-gray-600 hover:text-red-500">
                        ✕
                    </button>
                </div>

                {/* Coluna da imagem */}
                <div>
                    <img
                        src={`/${clickedDish.image}`}
                        alt="Foto do prato"
                        className="rounded-xl object-cover w-full h-full max-h-[400px]"
                    />
                </div>

                {/* Coluna de conteúdo */}
                <div className="flex flex-col justify-between gap-4 w-[95%]">
                    <div>
                        <h2 className="text-[clamp(1.5rem,1vw,2rem)] font-bold text-gray-800 mb-2 max-w-[90%]">{clickedDish?.name}</h2>
                        <p className="text-gray-600 mb-4">{clickedDish?.description}</p>
                        {/* <span className='bg-gray-200 block text-end'>Selecione o tamanho</span> */}
                        <div className='flex justify-between'>
                            <p className="text-xl font-semibold text-green-600">R$ {price?.toFixed(2)} </p>
                            <SizeIndicator
                                icon={GiHotMeal}
                                sizes={clickedDish?.sizes}
                                sizeDishName={sizeDishName}
                                setSizeDishName={setSizeDishName}
                                category={clickedDish?.category}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Seletor de quantidade */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <button onClick={decrease} className="text-lg px-2 text-gray-700 hover:text-black">−</button>
                            <span className="mx-3">{quantity}</span>
                            <button onClick={increase} className="text-lg px-2 text-gray-700 hover:text-black">+</button>
                        </div>

                        {/* Botão adicionar */}
                        <button className="bg-green-600 w-full hover:bg-green-700 text-white 
                        font-semibold px-6 py-2 rounded-lg shadow">
                            Adicionar ao pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
