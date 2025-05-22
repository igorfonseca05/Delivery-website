'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { OrderStatusCardProps } from '../../../../utils/types/types';

const statusSteps = ['Recebido', 'Em Preparo', 'A Caminho', 'Entregue'];

export default function OrderStatusCard({ user, item, status }: OrderStatusCardProps) {
    const currentStepIndex = statusSteps.indexOf(status);

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md p-6 w-full mb-4 mx-auto">
            {/* Lado esquerdo */}
            <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Pedido f5g6e9</h2>
                {/* <h2 className="text-lg mb-2">{item.name}</h2> */}
                {/* <p className="text-sm text-gray-500 mb-4">{item.orderNote || 'Sem observações'}</p> */}

                <div className="flex items-center gap-4 mb-4">
                </div>

                <div className="mt-6">
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
                            className="h-1 bg-orange-400 rounded-full transition-all"
                            style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Lado direito */}
            <div className="flex flex-col justify-between bg-gray-50 p-4 rounded-lg md:ml-6 mt-6 md:mt-0">
                {/* <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.nome.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium">{user.nome}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.telefone}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm mb-2">
                        Entrar em Contato
                    </button>
                    <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-sm">
                        Ver Detalhes
                    </button>
                </div> */}
            </div>
        </div>
    );
}
