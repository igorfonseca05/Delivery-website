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


export default function CheckoutForm() {
    const { setUserData, cartItensArray, setCartItensArray } = useCartContext()
    const { setError, error } = useMessageContext()
    const { user } = useAuthContext()
    const { addOrderGuests, getData, addDataToFireCollection } = useFirebase()

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orderId, setOrderId] = useState<string>()
    const [IsValidAddress, setIsValidAddress] = useState(false)
    const [address, setAddress] = useState<UserProfileAddress>()
    const [getOrder, setGetOrder] = useState('Entrega')

    const [formData, setFormData] = useState(userInitialState);

    const [userAddress] = useState<UserData>(() => {
        const stored = localStorage.getItem('userData');
        return stored ? JSON.parse(stored) : formData
    });

    const router = useRouter()
    const timeoutIds = useRef<Array<number | NodeJS.Timeout>>([]);

    enum Routes {
        Profile = '/profile',
        Payment = '/payment',
    }


    async function getUserAddressFromFirebase() {
        if (!user) return

        try {
            const addressProfile = await getData('users')
            const thereIsNotAddress = !addressProfile || !addressProfile?.data

            if (thereIsNotAddress) {
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
            getUserAddressFromFirebase()

            // Usuário não autenticado
            if (!userAddress) {
                setError('Precisamos do seu endereço para enviar seu pedido até você.')

                const timer = setTimeout(() => {
                    router?.push(Routes.Profile);
                    setIsValidAddress(false);
                }, 4000);

                timeoutIds.current.push(timer);
                return false
            }

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
                    ...cartItensArray
                }
            }
        }

        setOrderId(orderId)

        setCartItensArray([])
        setUserData(userInitialState)
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
        if (step <= 3) setStep(step + 1);
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
        setUserData(userData)
        moveToTheNextForm()
    }

    // Redireciona user para "home" se carrinho ficou vazio
    useEffect(() => {
        cartItensArray.length === 0 && router?.push('/')
    }, [cartItensArray.length])

    // Se user estiver logado, não mostra form de cadastro
    // de enderço.
    useEffect(() => {
        user && setStep(2)
        !user && setStep(1)
    }, [user])


    // Usa dados do localstorage para preencher o formulário do usuário
    // caso ele já tenha dados armazenados
    useEffect(() => {
        if (userAddress) {
            setFormData((prev) => ({
                ...prev,
                ...userAddress,
            }))

        }
    }, [userAddress])


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
        return () => {
            timeoutIds.current.forEach((id) => clearTimeout(id));
            timeoutIds.current = [];
        };
    }, [])

    return (
        <ContentContainer>
            <div className="mt-5 md:mt-0 w-full sm:p-4 relative">
                <div className="flex flex-col md:flex-row min-h-130 gap-x-4">
                    <div className="hidden md:w-1/3 md:block md:mb-0 rounded-lg order-2">
                        <OrderSummary />
                    </div>

                    <div className="md:w-2/3 p-2 sm:p-6 rounded-lg w-full min-h-full bg-white">
                        <FormHeader step={step}
                            handlePrevious={handlePrevious}
                            moveToTheNextForm={moveToTheNextForm}
                            setStep={setStep}
                            isValidAddress={IsValidAddress} />

                        {!user &&
                            step === 1 && (
                                <>
                                    <GetOrderContainer
                                        setGetOrder={setGetOrder}
                                        type='address'
                                        question='Como você gostaria que obter seu pedido?' />
                                    {
                                        getOrder === 'Entrega' ? (
                                            <>
                                                <Delivery
                                                    step={step}
                                                    handleFormSubmit={handleFormSubmit}
                                                    formData={formData}
                                                    setFormData={setFormData}
                                                    setGetOrder={setGetOrder}
                                                    getOrder={getOrder} />
                                            </>
                                        ) : (
                                            <motion.div className='flex flex-col space-y-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <PickupInstructions />
                                                <PickupMap />
                                                <button type='submit' className="button_primary_large  w-full md:max-w-70 m-auto md:m-0" onClick={moveToTheNextForm}>Proximo</button>
                                            </motion.div>
                                        )
                                    }
                                </>
                            )}

                        {IsValidAddress && (step === 2 && (
                            <motion.div className='basicStyle relative m-auto mb:p-0 h-fit flex flex-col ' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div>
                                    {/* <h1 className='text-[clamp(1.2rem,1em,2rem)] mb-2'>Pagamento</h1> */}
                                    {!orderId && cartItensArray.length !== 0 && (
                                        <>
                                            <GetOrderContainer
                                                setGetOrder={setGetOrder}
                                                type='payment'
                                                question='Escolha forma de pagamento' />
                                            <CardForm />
                                        </>
                                    )}
                                    {
                                        !orderId && cartItensArray.length === 0 &&
                                        <div className='h-full flex flex-col items-center'>
                                            <Image src={`/empty.svg`} alt="logo carrinho vazio" priority quality={50} width={300} height={300} className="opacity-40 mb-4" />
                                            <p>Adicione itens no carrinho para prosseguir com pagamento</p>
                                        </div>
                                    }
                                </div>
                                {/* <div className=' flex-col hidden justify-center items-center h-80'>
                                
                                    {loading && <Loading />}
                                    {success && <Success setSuccess={setSuccess} />}
                                    {orderId && <FinishedOrder orderId={orderId} />}
                                
                                </div> */}

                                <div className='flex justify-between gap-x-4'>
                                    <button onClick={handlePrevious} className={`button_neutral_large w-full md:max-w-50 m-auto md:m-0 ${user && 'hidden'}`}>Voltar</button>
                                    <button onClick={moveToTheNextForm} className={`button_primary_large w-full md:max-w-50 m-auto md:m-0 ${user && 'hidden'}`}>Próximo</button>
                                </div>


                                {orderId &&
                                    <Link href={'/'} className="button_primary_large text-center w-full m-auto md:text-end">Página inicial</Link>
                                }
                            </motion.div>
                        ))}

                        {(step === 3 && (
                            <motion.div className='basicStyle relative m-auto  mb:p-0 h-full flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div>
                                    {/* <h1 className='text-[clamp(1.2rem,1em,2rem)] mb-2'>Pagamento</h1> */}
                                    {!orderId && cartItensArray.length !== 0 && (
                                        <><p>pedido</p></>
                                    )}
                                    {
                                        !orderId && cartItensArray.length === 0 &&
                                        <div className='h-full flex flex-col items-center'>
                                            <Image src={`/empty.svg`} alt="logo carrinho vazio" priority quality={50} width={300} height={300} className="opacity-40 mb-4" />
                                            <p>Adicione itens no carrinho para prosseguir com pagamento</p>
                                        </div>
                                    }
                                </div>
                                <div className=' flex-col hidden justify-center items-center h-80'>
                                    {/* {!loading && !success && !orderId && cartItensArray.length !== 0 && <QRcode handlePayment={handlePayment} />} */}
                                    {loading && <Loading />}
                                    {success && <Success setSuccess={setSuccess} />}
                                    {orderId && <FinishedOrder orderId={orderId} />}
                                    {/* {success && <Failure />} */}
                                </div>

                                {/* {!orderId &&
                                    cartItensArray.length !== 0 && <PixCodeBox />
                                } */}

                                {!orderId &&
                                    <div className='flex gap-x-4'>
                                        <button onClick={handlePrevious} className={`button_neutral_large text-center w-full md:max-w-20 m-auto md:m-0 ${user && 'hidden'}`}>Voltar</button>
                                        <button onClick={handlePrevious} className={`button_primary_large w-full md:max-w-50 m-auto md:m-0 ${user && 'hidden'}`}>Próximo</button>
                                    </div>
                                }

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
