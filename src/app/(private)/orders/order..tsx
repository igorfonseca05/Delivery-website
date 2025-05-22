'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { OrderStatusCardProps } from '../../../../utils/types/types';
import OrderSummary from '@/app/(public)/payment/components/orderSummary/OrderSummary';

const statusSteps = ['Recebido', 'Em Preparo', 'A Caminho', 'Entregue'];

export default function OrderStatusCard({ user, item, status }: OrderStatusCardProps) {
    const currentStepIndex = statusSteps.indexOf(status);

    return (
        <div className="flex flex-col bg-white rounded-xl shadow-md p-6 w-full mb-4 mx-auto">
            {/* Lado esquerdo */}
            <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Pedido <span className='text-lg'>f5g6e9</span></h2>
                {/* <h2 className="text-lg mb-2">{item.name}</h2> */}
                {/* <p className="text-sm text-gray-500 mb-4">{item.orderNote || 'Sem observações'}</p> */}

                <div className="mt-6 w-full md:w-[80%] m-auto mb-8">
                    {/* <h3 className="font-semibold mb-2">Progresso do Pedido</h3> */}
                    <div className="flex items-center justify-between">
                        {statusSteps.map((step, index) => (
                            <div key={step} className="flex-1 flex flex-col items-center">
                                <div
                                    className={clsx(
                                        'w-8 h-8 rounded-full flex items-center justify-center mb-2',
                                        index <= currentStepIndex
                                            ? 'bg-orange-400 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                    )}
                                >
                                    {index + 1}
                                </div>
                                <p
                                    className={clsx(
                                        'text-xs text-center',
                                        index <= currentStepIndex ? 'text-orange-400 font-semibold' : 'text-gray-500'
                                    )}
                                >
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full mt-2 relative">
                        <div
                            className="h-1 bg-orange-400 rounded-full transition-all mt-4"
                            style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Lado direito */}
            <div className="flex flex-col md:flex-row justify-between rounded-lg w-full md:w-[80%] bg-red-400 m-auto ">
                <div className=' bg-gray-50 p-4 grow  mt-6 md:mt-0'>
                    <h1 className='text-lg'>Resumo do pedido</h1>

                </div>

                <div className=' bg-gray-50 p-4  grow mt-6 md:mt-0'>
                    <OrderSummary removeButton={true} />
                </div>

            </div>
        </div>
    );
}
