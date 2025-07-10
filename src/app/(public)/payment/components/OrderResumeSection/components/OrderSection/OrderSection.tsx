'use client';

import Image from 'next/image';
import { FC } from 'react';
import { OrderProps } from '../../../../../../../../utils/types/types';
import { getImageSourceType, upperCaseText } from '../../../../../../../../utils/helperFunctions';
import { CardItem } from '@/components/globalComponents/navbar/CartSidebar/CardItem/card_SideBar';
import { PriceIndicator } from '../../../orderSummary/priceIndicator/priceIndicator';
import { Info } from 'lucide-react';


export default function OrderSection({
    cartItens,
    orderDetails,
    userData,
    deliveryAndPayment,
}: OrderProps) {

    const sizeText = 'text-[clamp(1rem,1em,2rem)]'

    return (
        <>
            <h2 className="text-xl px-2 font-bold text-[clamp(1rem,1em,2rem)] md:hidden">Resumo do Pedido</h2>
            <section className="mx-auto bg-white rounded-2xl p-2 space-y-6 text-gray-800">
                <div className='flex flex-col mb-2 md:hidden md:flex-row '>
                    <div className='grow md:mb-0'>
                        <h3 className={`mb-2 font-semibold ${sizeText}`}>Itens do pedido:<span className='ml-2'>{orderDetails.totalCartItens}</span></h3>
                        <div className="space-y-2 max-h-60 md:max-h-82 overflow-y-auto overflow-x-hidden cartScroll">
                            {cartItens?.map(item => (
                                <CardItem
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='md:pr-8'>
                    <div className='mb-3'>
                        <h3 className={`font-semibold mb-2 ${sizeText}`}>Informações do cliente:</h3>
                        <p>{`${upperCaseText(userData.nome)} ${userData.sobrenome}`}</p>

                        {userData.telefone.length === 11 &&
                            <p>{`(${userData.telefone.slice(0, 2)}) ${userData.telefone.slice(3)}`}</p>
                        }

                        {userData.telefone.length === 9 &&
                            <p>{`(${userData.telefone.slice(0, 4)}) ${userData.telefone.slice(3)}`}</p>
                        }

                        {deliveryAndPayment.deliveryType === 'entrega'
                            ?
                            <>
                                <p>{upperCaseText(userData.rua)}, {userData.numero}</p>
                                <p>{userData.bairro}</p>
                                <p>{userData.cidade}</p>
                                <p> {userData.CEP.slice(0, 5)}-{userData.CEP.slice(5)}</p>
                            </> : 'Retirada no local'
                        }
                    </div>

                    <div className='mb-3'>
                        <h3 className={`font-semibold mb-2 ${sizeText}`}>Entrega & Pagamento:</h3>
                        <p>
                            <strong>Modalidade:</strong>{' '}
                            {deliveryAndPayment.deliveryType === 'entrega'
                                ? 'Entrega em domicílio'
                                : 'Retirada no local'}
                        </p>
                        <p>
                            <strong>Pagamento:</strong> {upperCaseText(deliveryAndPayment.paymentMethod)}
                        </p>
                    </div>

                    <h3 className={`font-semibold mb-2 ${sizeText}`}>Resumo financeiro:</h3>
                    <div className="space-y-2 text-sm text-gray-60">
                        <div className="flex justify-between">
                            <span>SubTotal:</span>
                            <PriceIndicator style="font-medium text-gray-800" type="totalCartItens" />
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                                <span>Taxa de entrega:</span>
                                <Info size={14} className="text-gray-400" />
                            </div>
                            <PriceIndicator type="deliveryFee" style="font-medium text-gray-800" />
                        </div>

                        <hr />

                        <div className="flex justify-between text-base font-semibold text-gray-900">
                            <span className="text-lg">Total:</span>
                            <PriceIndicator style="text-lg" type="total" />
                        </div>
                        {/* {!removeButton && <p className="text-xs text-gray-500">(Impostos inclusos)</p>} */}
                    </div>
                </div>
            </section>
        </>
    );
}
