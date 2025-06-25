'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ContentContainer } from '@/components/globalComponents/Container/container';
import Image from 'next/image';
import { useCartContext } from '../../../../context/cartContext';
import { Success } from './components/sucessLogo/Success';
import { Loading } from './components/loading/Loading';
import QRcode from './components/QRcontainer/QRcode';
import Failure from './components/Failure/Failure';
import Link from 'next/link';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { userInitialState } from '../../../../constants/constantFile';

import { useAuthContext } from '../../../../context/useAuthContext';

import { randomBytes } from 'crypto';
import OrderSummary from './components/orderSummary/OrderSummary';
import { FinishedOrder } from './components/FinishedOrder/FinishesOrder';
import { useFirebase } from '../../../../hooks/useFirebase';

import PixCodeBox from './components/QRcontainer/copyButton/CopyButton';

import { useMessageContext } from '../../../../context/messagesContext';
import { OrderWithotAuthProps, UserProfileAddress } from '../../../../utils/types/types';
import { UserData } from '../../../../utils/types/types';
import { toast } from 'react-toastify';
import FormHeader from './components/formHeader/FormHeader';
import GetOrderContainer from './components/getOrderContainer/getOrderContainer';
import Delivery from './components/deliverSection/Delivery';
import PickupInstructions from './components/pickupSection/PickupInstructions';
import PickupMap from './components/pickupSection/map/map';
import CardForm from './components/paymentSection/paymentSection';
import PaymentSeletor from './components/paymentSelector/PaymentSelector';
import OrderSection from './components/OrderSection/OrderSection';


export default function CheckoutForm() {
    const { order, setOrder } = useCartContext()
    const { setError, error } = useMessageContext()
    const { user } = useAuthContext()
    const { addOrderGuests, getData, addDataToFireCollection } = useFirebase()

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orderId, setOrderId] = useState<string>()
    const [IsValidAddress, setIsValidAddress] = useState(false)
    const [address, setAddress] = useState<UserProfileAddress>()

    // Indica a forma de receber o pedido
    const [getOrder, setGetOrder] = useState(1)
    // Indica a forma de pagar o pedido
    const [paymentMethod, setPaymentMethod] = useState(3)

    // estado inicial do form
    const [formData, setFormData] = useState(userInitialState);

    // const [userAddress] = useState<UserData>(() => {
    //     const stored = localStorage.getItem('userData');
    //     return stored ? JSON.parse(stored) : formData
    // });

    const router = useRouter()
    const timeoutIds = useRef<Array<number | NodeJS.Timeout>>([]);

    enum Routes {
        Profile = '/profile',
        Payment = '/payment',
    }


    function get_Non_Authenticated_User_Address() {
        if (!order.userData) {
            setError('Precisamos do seu endereço para enviar seu pedido até você.')

            const timer = setTimeout(() => {
                router?.push(Routes.Payment);
                setIsValidAddress(false);
            }, 4000);

            timeoutIds.current.push(timer);
            return false
        }
    }

    async function get_Authenticated_User_Address() {
        if (!user) return

        try {
            const addressProfile = await getData('users')
            const thereIsNoAddressAdded = !addressProfile || !addressProfile?.data

            if (thereIsNoAddressAdded) {
                setError('Precisamos do seu endereço para enviar seu pedido até você.')

                const timer = setTimeout(() => {
                    router?.push(Routes.Profile)
                    setIsValidAddress(false)
                }, 4000)

                timeoutIds.current.push(timer);
                return false
            }
        } catch (error) {

        }
    }


    function verifyAddress() {
        try {
            // Se usuário está logado, verifica no Firebase
            get_Authenticated_User_Address()

            // Usuário não autenticado
            get_Non_Authenticated_User_Address()

            setIsValidAddress(true)
            return true

        } catch (error) {
            console.error('Erro ao verificar endereço:', error);
            setError('Ocorreu um erro ao verificar seu endereço. Tente novamente.');
            return false;
        }

    }

    async function createOrder() {
        const orderId = randomBytes(6).toString('hex')

        if (!user) {
            const storageOrder = localStorage.getItem('order')
            const localStorageOrder = storageOrder ? JSON.parse(storageOrder) : null

            const orderFinished = {
                orderId,
                ...localStorageOrder
            }

        } else {
            const orderFinished = {
                orderId,
                ...address,
                cart: {
                    ...order.cartItens
                }
            }
        }

        setOrderId(orderId)

        // Reset user information after payment
        setOrder({
            ...order,
            userData: { ...userInitialState },
            cartItens: []
        })
    }

    async function handlePayment() {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setSuccess(true)

            setTimeout(() => {
                setSuccess(false)
                createOrder()
            }, 3000)
        }, 4000)
    }

    const moveToTheNextForm = () => {
        if (step < 3) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    // Verificando forms inputs
    function isEmptyAddressFormField() {
        return Object.entries(formData)
            .some(item => item[0] === 'complemento' ? null : item[1] === '')
    }

    // Formulário para o endeço de pagamento
    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (isEmptyAddressFormField()) {
            return setIsValidAddress(false)
        }

        const userData = {
            ...formData
        }

        setOrder({
            ...order,
            userData: { ...userData }
        })
        moveToTheNextForm()
    }

    // Redireciona user para "home" se carrinho ficou vazio
    useEffect(() => {
        order.cartItens.length === 0 && router?.push('/')
    }, [order.cartItens.length])

    // Se user estiver logado, não mostra form de cadastro
    // de enderço.
    useEffect(() => {
        user && setStep(2)
        !user && setStep(1)
    }, [user])


    // Usa dados do localstorage para preencher o formulário do usuário
    // caso ele já tenha dados armazenados
    useEffect(() => {
        if (order.userData) {
            setFormData((prev) => ({
                ...prev,
                ...order.userData,
            }))

        }
    }, [order.userData])


    useEffect(() => {
        if (step === 2) {
            (async () => {
                await verifyAddress()
            })()
        }
    }, [step])


    useEffect(() => {
        error && toast.error(error)
        setError('')
    }, [error])


    useEffect(() => {
        if (!getOrder && !paymentMethod) return

        setOrder({
            ...order,
            deliveryAndPayment: {
                deliveryType: getOrder === 1 ? 'entrega' : 'retirar na loja',
                paymentMethod: paymentMethod === 3 ? 'cartao de credito' : 'pix'
            }
        })
    }, [getOrder, paymentMethod])


    useEffect(() => {
        return () => {
            timeoutIds.current.forEach((id) => clearTimeout(id));
            timeoutIds.current = [];
        };
    }, [])


    return (
        <ContentContainer>
            <div className="mt-5 md:mt-4 w-full relative transition ">
                <div className="flex flex-col md:flex-row min-h-130 gap-x-4 ">
                    {
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='order-2 hidden md:w-1/2 md:block md:mb-0 rounded-lg'>
                            <OrderSummary />
                        </motion.div>
                    }

                    <div className="p-2 sm:p-6 rounded-lg w-full bg-white shadow-sm">
                        <FormHeader step={step}
                            setStep={setStep}
                            isValidAddress={IsValidAddress}
                        />

                        {!user && step === 1 && (
                            <>
                                <GetOrderContainer
                                    setGetOrder={setGetOrder}
                                    message='Como você gostaria que obter seu pedido?'
                                    order={getOrder}
                                />

                                {
                                    getOrder === 1 ? (
                                        <Delivery
                                            handleFormSubmit={handleFormSubmit}
                                            formData={formData}
                                            setFormData={setFormData} />

                                    ) : (
                                        <motion.div className='flex flex-col space-y-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <PickupInstructions />
                                            <PickupMap />
                                            <div className='flex justify-end'>
                                                <button type='submit' className="button_primary_large w-full md:max-w-50 m-auto md:m-0 flex items-center justify-center gap-x-3" onClick={moveToTheNextForm}>Proximo <ArrowRight size={18} /></button>
                                            </div>
                                        </motion.div>
                                    )
                                }
                            </>
                        )}

                        {IsValidAddress && step === 2 && (
                            <motion.div className='basicStyle relative m-auto mb:p-0 h-dvh flex flex-col ' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div>
                                    {!orderId && order.cartItens.length !== 0 && (
                                        <>
                                            <PaymentSeletor setPaymentMethod={setPaymentMethod}
                                                type='payment'
                                                message='Escolha forma de pagamento'
                                                step={step}
                                                setStep={setStep}
                                                paymentMethod={paymentMethod} />

                                            {
                                                paymentMethod === 3 ? (
                                                    <CardForm />
                                                ) : (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=' relative m-auto mb:p-0 flex h-75 flex-col overflow-hidden'>
                                                        <div className="mb-4 bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                                                            <p className="text-sm text-amber-800">
                                                                💡 Você selecionou <strong>Pix</strong> como forma de pagamento. Você pode alterá-la acima.
                                                            </p>
                                                        </div>
                                                        <Image
                                                            src="/pix.png" // ajuste o caminho conforme seu projeto
                                                            alt="Ilustração de pagamento com Pix"
                                                            width={190} // você pode ajustar conforme o espaço horizontal
                                                            height={190} // altura exata do seu espaço: 75*4
                                                            className="mx-auto"
                                                            priority // para carregar rápido se estiver visível ao abrir a tela
                                                        />

                                                    </motion.div>
                                                )
                                            }

                                        </>
                                    )}
                                </div>
                                <div className='flex justify-between gap-x-4'>
                                    <button onClick={handlePrevious} className={`button_neutral_large flex items-center justify-center gap-x-2 w-full md:max-w-50 m-auto md:m-0 ${user && 'hidden'}`}><ArrowLeft size={18} /> Voltar</button>
                                    <button onClick={moveToTheNextForm} className={`buttonColor flex items-center justify-center gap-x-2 py-3 w-full md:max-w-50 m-auto md:m-0 ${user && 'hidden'}`}>Próximo <ArrowRight size={18} /> </button>
                                </div>

                                {orderId &&
                                    <Link href={'/'} className="button_primary_large text-center w-full m-auto md:text-end">Página inicial</Link>
                                }
                            </motion.div>
                        )}

                        {(step === 3 && (
                            <motion.div className='basicStyle relative m-auto mb:p-0 h-dvh py-2 gap-y-4 flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                                <div className=' flex-col hidden justify-center items-center h-80'>
                                    {loading && <Loading />}
                                    {success && <Success setSuccess={setSuccess} />}
                                    {orderId && <FinishedOrder orderId={orderId} />}
                                    {/* {success && <Failure />} */}
                                </div>

                                <div className='flex justify-between'>
                                    <button onClick={handlePrevious} className={`button_neutral_large flex items-center justify-center gap-x-2 w-full md:max-w-50 m-auto md:m-0 ${user || order.cartItens.length === 0 && 'hidden'}`}><ArrowLeft size={18} /> Voltar</button>
                                    <button onClick={handlePrevious} className={`button_primary_large text-center w-full md:max-w-50 m-auto md:m-0 ${order.cartItens.length === 0 && 'hidden'}`}>Finalizar Pedido</button>
                                </div>
                                {orderId &&
                                    <Link href={'/'} className="button_primary_large text-center w-full m-auto md:text-end">Página inicial</Link>
                                }
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </ContentContainer >
    );
}
