'use client'

import { useCartContext } from '../../../../../context/cartContext';
import { useState, useEffect, use } from 'react'

import { DishesProps } from '../../../../../utils/types/types'

import { GiHotMeal } from "react-icons/gi";
import { MdAddShoppingCart } from "react-icons/md";

import { SizeIndicator } from './sizeIndicator/SizeIndicator'

import { useToggleCartContext } from '../../../../../context/toggleCartContext';

import { useMessageContext } from '../../../../../context/messagesContext';

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
    const [sizeDishName, setSizeDishName] = useState<string>('Mini')
    const [orderNote, setOrderNote] = useState('')

    const increase = () => setQuantity(q => q + 1)
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))


    function handleFood(clickedDish: DishesProps) {
        if (!clickedDish) return

        const selectedDish = {
            id: clickedDish.id,
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
        <div className={`fixed inset-0 z-50 bg-black/60 flex items-center justify-center transition-all duration-300 ${modalIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}>

            {/* Modal */}
            <div className="bg-white rounded-lg shadow-xl w-[95%] max-w-[400px] md:max-w-5xl p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                {/* Botões de Fechar Modal */}
                <div className="absolute top-4 right-4 flex gap-3 z-10">
                    <button onClick={() => setModalIsOpen(!modalIsOpen)} className="text-gray-600 hover:text-red-500"> ✕ </button>
                </div>

                {/* Coluna da imagem */}
                <div>
                    <img
                        src={`/${clickedDish?.image}`}
                        alt="Foto do prato"
                        className="rounded-lg object-cover w-full h-full max-h-[150px] md:max-h-[400px]"
                    />
                </div>

                {/* Coluna de conteúdo 0 lado direito modal */}
                <div className="flex flex-col justify-between gap-y-2 lg:gap-y-4 w-full md:w-[90%] mx-auto">
                    <div className=' flex flex-col justify-between h-full'>
                        <h2 className="text-[clamp(1rem,1.7vw,2rem)] font-bold text-gray-800 mb-2 max-w-[90%]">{clickedDish?.name}</h2>
                        <p className="text-gray-500 lg:mb-4 text- text-[clamp(0.8rem,0.8vw,2rem)]">{clickedDish?.description}</p>
                        {/* <span className='bg-gray-200 block text-end'>Selecione o tamanho</span> */}
                        <div className='flex justify-between items-center mb-2 mb:mb-0'>
                            <p className="text-[clamp(1rem,1vw,2rem)] font-semibold TextColor">R$ {price?.toFixed(2)} </p>
                            <SizeIndicator
                                icon={GiHotMeal}
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

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ">
                        {/* Seletor de quantidade */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 lg:py-2">
                            <button onClick={decrease} className="text-lg px-2 TextColor hover:text-black">−</button>
                            <span className="mx-3">{quantity}</span>
                            <button onClick={increase} className="text-lg px-2 TextColor hover:text-black">+</button>
                        </div>

                        {/* Botão adicionar */}
                        <button className="button_primary_large w-full flex justify-center items-center gap-2"
                            onClick={() => handleFood(clickedDish as DishesProps)}>
                            Adicionar ao pedido
                            <MdAddShoppingCart size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
