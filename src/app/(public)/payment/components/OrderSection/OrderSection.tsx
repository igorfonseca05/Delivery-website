'use client';

import Image from 'next/image';
import { FC } from 'react';
import { OrderProps } from '../../../../../../utils/types/types';
import { getImageSourceType, upperCaseText } from '../../../../../../utils/helperFunctions';
import { CardItem } from '@/components/globalComponents/navbar/CartSidebar/CardItem/card_SideBar';
import { PriceIndicator } from '../orderSummary/priceIndicator/priceIndicator';
import { Info } from 'lucide-react';


export default function OrderSection({
    cartItens,
    orderDetails,
    userData,
    deliveryAndPayment,
}: OrderProps) {

    const sizeText = 'text-[clamp(1.2rem,1em,2rem)]'

    return (
        <section className=" mx-auto bg-white rounded-2xl p-2 space-y-6 text-gray-800">
            <h2 className="text-xl mb-4 font-bold text-[clamp(1.5rem,1em,2rem)]">Resumo do Pedido</h2>
            <div className='flex flex-col md:flex-row'>
                <div className='grow mb-4 md:mb-0 md:order-2 '>
                    <h3 className={`font-semibold mb-2 ${sizeText}`}>Itens do pedido:<span className='ml-2'>{orderDetails.totalCartItens}</span></h3>
                    <div className="space-y-2 max-h-60 md:max-h-82 overflow-y-auto overflow-x-hidden transition cartScroll">
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

                <div className='md:pr-8 grow-0'>
                    <div className='mb-3'>
                        <h3 className={`font-semibold mb-2 ${sizeText}`}>Informações do cliente:</h3>
                        <p>{`${upperCaseText(userData.nome)} ${userData.sobrenome}`}</p>
                        <p>{upperCaseText(userData.email)}</p>
                        <p>{userData.telefone}</p>
                        <p>
                            {deliveryAndPayment.deliveryType === 'entrega'
                                ? `${upperCaseText(userData.rua)}, ${userData.numero} - ${userData.bairro}, ${userData.cidade} - CEP ${userData.CEP}`
                                : 'Retirada no local'}
                        </p>
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
            </div>
        </section>
    );
}
