'use client'

import { useState } from 'react'

interface FoodModalProps {
    isOpen: boolean
    onClose: () => void
}

export function FoodModal({ isOpen, onClose }: FoodModalProps) {
    const [quantity, setQuantity] = useState(1)

    if (!isOpen) return null

    const increase = () => setQuantity(q => q + 1)
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-5xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                {/* Botões de ícones no topo */}
                <div className="absolute top-4 right-4 flex gap-3 z-10">
                    <button className="text-gray-600 hover:text-gray-800">
                        🛒
                    </button>
                    <button onClick={onClose} className="text-gray-600 hover:text-red-500">
                        ✕
                    </button>
                </div>

                {/* Coluna da imagem */}
                <div>
                    <img
                        src="https://via.placeholder.com/500x400"
                        alt="Foto do prato"
                        className="rounded-xl object-cover w-full h-full max-h-[400px]"
                    />
                </div>

                {/* Coluna de conteúdo */}
                <div className="flex flex-col justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Nome do Prato</h2>
                        <p className="text-gray-600 mb-4">
                            Uma descrição detalhada e apetitosa do prato. Ingredientes, sabores e qualquer outra informação importante.
                        </p>
                        <p className="text-xl font-semibold text-green-600">R$ 39,90</p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        {/* Seletor de quantidade */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                            <button onClick={decrease} className="text-lg px-2 text-gray-700 hover:text-black">−</button>
                            <span className="mx-3">{quantity}</span>
                            <button onClick={increase} className="text-lg px-2 text-gray-700 hover:text-black">+</button>
                        </div>

                        {/* Botão adicionar */}
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
                            Adicionar ao pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
