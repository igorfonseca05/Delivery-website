import { motion } from 'framer-motion'
import OrderSection from './components/OrderSection/OrderSection';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

import { useCartContext } from '../../../../../../context/cartContext';

interface OrderResumeProps {
    handlePrevious: () => void,
}

export default function OrderResume({ handlePrevious }: OrderResumeProps) {

    const { order } = useCartContext()

    return (
        <motion.div className='basicStyle relative m-auto mb:py-0 h-dvh gap-y-4 flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>
                {order.cartItens.length !== 0 ? (
                    <OrderSection
                        cartItens={order.cartItens}
                        orderDetails={order.orderDetails}
                        userData={order.userData}
                        deliveryAndPayment={order.deliveryAndPayment}
                    />
                ) : (
                    <div className='h-80 opacity-50'>
                        <Image src={'/empty.svg'} fill alt='' />
                    </div>
                )}
            </div>
            <div className='flex justify-between gap-x-4'>
                <button onClick={handlePrevious} className={`button_neutral_large flex items-center justify-center gap-x-2 w-full md:max-w-50 m-auto md:m-0 ${order.cartItens.length === 0 && 'hidden'}`}><ArrowLeft size={18} /> Voltar</button>
                <button onClick={handlePrevious} className={`buttonColor gap-x-2 py-3 px-15 text-nowrap w-full md:max-w-70 m-auto md:m-0 ${order.cartItens.length === 0 && 'hidden'}`}>Finalizar Pedido</button>
            </div>
        </motion.div>
    );
};