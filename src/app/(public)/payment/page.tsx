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


export default function CheckoutForm() {
    const router = useRouter()
    const timeoutIds = useRef<Array<number | NodeJS.Timeout>>([]);

    enum Routes {
        Profile = '/profile',
        Payment = '/payment',
    }

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

    // Estaso inicial do formulário
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        rua: '',
        cidade: '',
        bairro: '',
        CEP: '',
        numero: '',
        complemento: '',
    });

    // Busco dados para adicionar ao form
    // caso o usuário já tenha digitado esses dados uma vez
    const [userAddress, setUserAddress] = useState<UserData>(() => {
        const stored = localStorage.getItem('userData');
        return stored ? JSON.parse(stored) : formData
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function verifyAddress() {
        try {
            // Verificando se usuário adicionou endereço
            // const storageAddress = localStorage.getItem('userData')
            // const userAddress = storageAddress ? JSON.parse(storageAddress) : null

            // Se usuário está logado, verifica no Firebase
            if (user) {
                const addressProfile = await getData('users')

                // if (!addressProfile) {
                //     throw new Error('Endereço não informado')
                // }
                setAddress(address)

                if (!addressProfile || !addressProfile?.data) {
                    setError('Precisamos do seu endereço para enviar seu pedido até você.')
                    const timer = setTimeout(() => {
                        router?.push(Routes.Profile)
                        setIsValidAddress(false)
                    }, 4000)

                    timeoutIds.current.push(timer);
                    return false
                }
            }

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
        const random = randomBytes(6).toString('hex')

        if (!user) {
            const storageOrder = localStorage.getItem('order')
            const order = storageOrder ? JSON.parse(storageOrder) : null

            const orderFinished = {
                orderId: random,
                ...order
            }

        } else {

            const orderFinished = {
                orderId: random,
                ...address,
                cart: {
                    ...cartItensArray
                }
            }
        }

        setOrderId(random)

        setCartItensArray([])
        setUserData({
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            cidade: '',
            complemento: '',
            bairro: '',
            numero: '',
            CEP: '',
            rua: '',
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
        if (step === 1) setStep(2);
    };

    const handlePrevious = () => {
        if (step === 2) setStep(1);
    };

    // Verificando forms inputs
    function isEmptyAddressFormField() {
        return Object.entries(formData)
            .some(item => item[0] === 'complemento' ? null : item[1] === '')

    }

    // Formulário para o endeço de pagamento
    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (isEmptyAddressFormField()) return

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

    console.log(getOrder)

    return (
        <ContentContainer>
            <div className="mt-5 md:mt-0 w-full sm:p-4 relative">
                <div className="flex flex-col md:flex-row min-h-130 gap-x-4">
                    <div className="hidden md:w-1/3 md:block md:mb-0 rounded-lg">
                        <OrderSummary />
                    </div>

                    <div className="md:w-2/3 p-2 sm:p-6 rounded-lg w-full min-h-full bg-white">
                        <FormHeader step={step} />
                        {!user &&
                            step === 1 && (
                                <>
                                    <GetOrderContainer setGetOrder={setGetOrder} />
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
                                                <button type='submit' className=" button_primary_large w-full md:max-w-70 m-auto md:m-0" onClick={moveToTheNextForm}>Next</button>
                                            </motion.div>
                                        )
                                    }
                                </>
                            )}

                        {IsValidAddress && (step === 2 && (
                            <motion.div className='basicStyle relative m-auto p-4 mb:p-0 h-full flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div>
                                    <h1 className='text-[clamp(1.2rem,1em,2rem)] mb-2'>Pagamento</h1>
                                    {!orderId && cartItensArray.length !== 0 && (
                                        <div className="rounded-lg text-gray-600 ">
                                            <p className="mb-2">
                                                Aponte a câmera do seu celular para o QR Code abaixo para realizar o pagamento via <strong>Pix</strong>.
                                            </p>
                                            <p>
                                                Seu pedido será aprovado automaticamente assim que o pagamento for confirmado.
                                            </p>
                                        </div>
                                    )}
                                    {
                                        !orderId && cartItensArray.length === 0 &&
                                        <div className='h-full flex flex-col items-center'>
                                            <Image src={`/empty.svg`} alt="logo carrinho vazio" priority quality={50} width={300} height={300} className="opacity-40 mb-4" />
                                            <p>Adicione itens no carrinho para prosseguir com pagamento</p>
                                        </div>
                                    }
                                </div>
                                <div className='flex flex-col justify-center items-center h-80'>
                                    {!loading && !success && !orderId && cartItensArray.length !== 0 && <QRcode handlePayment={handlePayment} />}
                                    {loading && <Loading />}
                                    {success && <Success setSuccess={setSuccess} />}
                                    {orderId && <FinishedOrder orderId={orderId} />}
                                    {/* {success && <Failure />} */}
                                </div>
                                {!orderId && cartItensArray.length !== 0 && <PixCodeBox />}
                                {!orderId && <button onClick={handlePrevious} className={`button_primary_large max-w-50 m-auto md:m-0 ${user && 'hidden'}`}>Previous</button>}
                                {orderId && <Link href={'/'} className="button_primary_large text-center max-w-50 m-auto md:text-end">Página inicial</Link>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </ContentContainer >
    );
}
