'use client'

import { useCartContext } from '../../../../../context/cartContext';
import { useState, useEffect, use } from 'react'
import Image from 'next/image';

import { DishesProps } from '../../../../../utils/types/types'

import { Soup } from "lucide-react";
import { ShoppingCart, X } from "lucide-react";

import { SizeIndicator } from './sizeIndicator/SizeIndicator'

import { useToggleCartContext } from '../../../../../context/toggleCartContext';

import { useMessageContext } from '../../../../../context/messagesContext';
import { upperCaseText } from '../../../../../utils/helperFunctions';

interface FoodModalProps {
    modalIsOpen: boolean
    setModalIsOpen: (modalIsOpen: boolean) => void,
    clickedDish: DishesProps
}


export function FoodModal({ modalIsOpen, setModalIsOpen, clickedDish }: FoodModalProps) {

    const { addToCart } = useCartContext()
    const { cartIsOpen, setCartIsOpen } = useToggleCartContext()
    const { error } = useMessageContext()

    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState<number>(0)
    const [sizeDishName, setSizeDishName] = useState<string>('mini')
    const [orderNote, setOrderNote] = useState('')

    const increase = () => setQuantity(q => q + 1)
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))


    function handleFood(clickedDish: DishesProps) {
        if (!clickedDish) return

        const selectedDish = {
            _id: clickedDish._id,
            name: clickedDish.name,
            imageUrl: clickedDish.image,
            quantity,
            price,
            sizeDishName,
            orderNote
        }

        addToCart(selectedDish)
        setModalIsOpen(!modalIsOpen)
        setCartIsOpen(true)

    }

    useEffect(() => {
        if (!clickedDish) return

        if (clickedDish?.sizes.length >= 2) {
            clickedDish?.sizes.map(item => {
                item.type === sizeDishName && setPrice(item.price)
            })
        } else {
            setPrice(clickedDish?.sizes[0]?.price)
            setSizeDishName(clickedDish?.sizes[0].type)
        }

    }, [clickedDish?.sizes, sizeDishName])

    // Remover barra de rolagem ao abrir modal
    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden'
        }
    }, [modalIsOpen])

    // Adicionando a barra de rolagem quando 
    // modal é desmontado
    useEffect(() => {
        return () => { document.body.style.overflow = '' }
    }, [])


    return (
        // fundo do Modal
        <div className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center transition-opacity ease-in-out duration-400 ${modalIsOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>

            {/* Modal */}
            <div className={`bg-white rounded-lg shadow-x m-1 w-[90%] md:max-w-5xl md:p-4 h-fit relative cardAnimate`}>

                <main className='p-3 grid grid-cols-1 md:grid-cols-2 max-w-100 md:max-w-full h-full'>
                    {/* Botões de Fechar Modal */}
                    <div className="absolute top-4 right-4 p-1 flex gap-3 z-10 bg-gray-100 rounded-full">
                        <button onClick={() => setModalIsOpen(!modalIsOpen)} className="text-gray-600 hover:text-red-500"> <X size={20} /> </button>
                    </div>
                    {/* Coluna da imagem */}
                    <div className='h-50 md:h-full'>
                        {clickedDish?.image ? (
                            <Image
                                src={clickedDish?.image}
                                alt="Foto do prato"
                                className="rounded-lg object-cover w-full h-full md:max-h-[400px]"
                                width={800}
                                height={400}
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 800px"
                                priority
                            />
                        ) : (
                            <p>Carregando...</p>
                        )}

                    </div>
                    {/* Coluna de conteúdo 0 lado direito modal */}
                    <div className="flex flex-col justify-between lg:gap-y-4 mt-2 w-full min-w-auto md:w-[90%] mx-auto">
                        <div className=' flex flex-col justify-between h-full'>
                            <h2 className="text-[clamp(1.5rem,1.7vw,2rem)] font-bold text mb-2 max-w-[90%]">{upperCaseText(clickedDish?.name)}</h2>
                            <p className="text-black/70  lg:mb-4 text-[clamp(1rem,0.8vw,2rem)]">{upperCaseText(clickedDish?.description)}</p>
                            {/* <span className='bg-gray-200 block text-end'>Selecione o tamanho</span> */}
                            <div className='flex justify-between items-center mb-2 mb:mb-0'>
                                <p className="text-[clamp(1.2rem,1vw,2rem)] font-semibold TextColor">R$ {price?.toFixed(2)} </p>
                                <SizeIndicator
                                    icon={Soup}
                                    sizes={clickedDish?.sizes}
                                    sizeDishName={sizeDishName}
                                    setSizeDishName={setSizeDishName}
                                    category={clickedDish?.category}
                                />
                            </div>
                            <textarea name="orderNote" id=""
                                className='w-full border border-gray-300 rounded-sm md:h-25 mb-2 mb:mb-0 resize-none p-3 outline-none'
                                placeholder='Ex: Tirar cebola, preciso de talher'
                                onChange={(e) => setOrderNote(e.target.value)}></textarea>
                        </div>
                        <div className="flex sm:flex-row items-center justify-between gap-4 ">
                            {/* Seletor de quantidade */}
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 lg:py-2">
                                <button onClick={decrease} className="text-lg px-2 TextColor hover:text-black">−</button>
                                <span className="mx-3">{quantity}</span>
                                <button onClick={increase} className="text-lg px-2 TextColor hover:text-black">+</button>
                            </div>
                            {/* Botão adicionar */}
                            <button className="button_primary_large w-full flex justify-center items-center gap-2"
                                onClick={() => handleFood(clickedDish as DishesProps)}>
                                <span className='text-[clamp(0.8em,0.8em,1rem)] hidden sm:block'>Adicionar ao pedido</span>
                                <ShoppingCart size={24} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
