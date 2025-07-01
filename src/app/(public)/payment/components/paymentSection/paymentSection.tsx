import { motion } from 'framer-motion'
import PaymentSeletor from "./components/paymentSelector/PaymentSelector";
import CardForm from './components/cardForm/paymentSection';
import Pix from './components/PixPayment/Pix';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useCartContext } from '../../../../../../context/cartContext';

interface PaymentSeletorProps {
    paymentMethod?: number
    setPaymentMethod: (paymentMethod: number) => void,
    handlePrevious: () => void,
    moveToTheNextForm: () => void
}

export default function PaymentSection({
    paymentMethod,
    setPaymentMethod,
    handlePrevious,
    moveToTheNextForm
}: PaymentSeletorProps) {

    const { order } = useCartContext()

    return (
        <motion.div className='basicStyle relative m-auto mb:p-0 h-dvh flex flex-col ' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>

                {order.cartItens.length !== 0 && (
                    <>
                        <PaymentSeletor setPaymentMethod={setPaymentMethod}
                            message='Escolha forma de pagamento'
                            paymentMethod={paymentMethod} />

                        {
                            paymentMethod === 3 ? (
                                <CardForm
                                    paymentMethod={paymentMethod}
                                    handlePrevious={handlePrevious}
                                    moveToTheNextForm={moveToTheNextForm} />
                            ) : (
                                <Pix />
                            )
                        }

                    </>
                )}
            </div>
            <div className={`flex justify-between gap-x-4 ${paymentMethod === 3 && 'hidden'}`}>
                <button onClick={handlePrevious} className={`button_neutral_large flex items-center justify-center gap-x-2 w-full md:max-w-50 m-auto md:m-0`}><ArrowLeft size={18} /> Voltar</button>
                <button onClick={moveToTheNextForm} className={`buttonColor flex items-center justify-center gap-x-2 px-20 py-3 w-full md:max-w-70 m-auto md:m-0`}>Próximo <ArrowRight size={18} /> </button>
            </div>
        </motion.div>
    );
};