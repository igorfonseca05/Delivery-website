'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ContentContainer } from '@/components/globalComponents/Container/container';
import Image from 'next/image';
import { useCartContext } from '../../../../context/cartContext';
import { Success } from './components/PaymentSection/components/sucessLogo/Success';
import { Loading } from './components/PaymentSection/components/loading/Loading';
import QRcode from './components/PaymentSection/components/QRcontainer/QRcode';
import Failure from './components/PaymentSection/components/Failure/Failure';
import Link from 'next/link';

import { ArrowLeft, ArrowRight, Pi } from 'lucide-react';

import { userInitialState } from '../../../../constants/constantFile';

import { useAuthContext } from '../../../../context/useAuthContext';

import { randomBytes } from 'crypto';
import OrderSummary from './components/orderSummary/OrderSummary';
import { FinishedOrder } from './components/PaymentSection/components/FinishedOrder/FinishesOrder';
import { useFirebase } from '../../../../hooks/useFirebase';

import { useMessageContext } from '../../../../context/messagesContext';
import { OrderWithotAuthProps, UserProfileAddress } from '../../../../utils/types/types';
import { UserData } from '../../../../utils/types/types';
import { toast } from 'react-toastify';
import GetOrderContainer from './components/DeliverySection/components/getOrderContainer/getOrderContainer';
import Delivery from './components/DeliverySection/components/addressForm/Delivery';
import Stepper from './components/Stepper/FormHeader';
import PickUpSection from './components/DeliverySection/components/pickUpInStoreSection/PickUpSection';
import OrderResume from './components/OrderResumeSection/OrderResume';
import PaymentSection from './components/PaymentSection/PaymentSection';
import DeliverySection from './components/DeliverySection/DeliverySection';


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

    const router = useRouter()
    const timeoutIds = useRef<Array<number | NodeJS.Timeout>>([]);

    enum Routes {
        Profile = '/profile',
        Payment = '/payment',
    }


    function get_Non_Authenticated_User_Address() {
        const userAddress = order.userData

        if (!userAddress) {
            setError('Precisamos do seu endereço para enviar seu pedido até você.')

            const timer = setTimeout(() => {
                router?.push(Routes.Payment);
                setIsValidAddress(false);
            }, 4000);

            timeoutIds.current.push(timer);
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
            setError('Erro ao obter endereço de usuário')
        }
    }


    function verifyAddress() {
        try {

            // Se usuário está logado, verifica no Firebase
            get_Authenticated_User_Address()

            // Usuário não autenticado
            get_Non_Authenticated_User_Address()

            setIsValidAddress(true)
        } catch (error) {
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
                    {/* Resumo Pedido Container */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='order-2 hidden md:w-1/2 md:block md:mb-0 rounded-lg'>
                        <OrderSummary />
                    </motion.div>

                    <div className="p-2 sm:p-6 rounded-lg w-full bg-white shadow-sm">
                        <Stepper
                            step={step}
                            setStep={setStep}
                            isValidAddress={IsValidAddress}
                        />

                        {/* Tela 1 - Endereço ou retirar na loja */}
                        {step === 1 && (
                            <DeliverySection
                                getOrder={getOrder}
                                setGetOrder={setGetOrder}
                                message='Como você gostaria que obter seu pedido?'
                                handleFormSubmit={handleFormSubmit}
                                formData={formData}
                                setFormData={setFormData}
                                moveToTheNextForm={moveToTheNextForm}
                            />
                        )}

                        {/* Tela 2 - Pagamento cartão ou pix */}
                        {IsValidAddress && step === 2 && (
                            <PaymentSection paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                handlePrevious={handlePrevious}
                                moveToTheNextForm={moveToTheNextForm} />
                        )}

                        {/* Tela revisar Pedido */}
                        {(step === 3 && (
                            <OrderResume handlePrevious={handlePrevious} />
                        ))}
                    </div>
                </div>
            </div>
        </ContentContainer >
    );
}
