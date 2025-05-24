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


export default function CheckoutForm() {
    const router = useRouter()
    const timeoutIds = useRef<Array<number | NodeJS.Timeout>>([]);

    enum Routes {
        Profile = '/profile',
        Payment = '/payment',
    }

    const {
        setUserData,
        cartItensArray,
        setCartItensArray,
        total,
        totalCartItens,
        deliveryFee,
    } = useCartContext()

    const { setError, error } = useMessageContext()

    const { user } = useAuthContext()
    const { addOrderGuests, getData, addDataToFireCollection } = useFirebase()

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orderId, setOrderId] = useState<string>()
    const [IsValidAddress, setIsValidAddress] = useState(false)

    const [address, setAddress] = useState<UserProfileAddress>()

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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function verifyAddress() {
        try {
            // Verificando se usuário adicionou endereço
            const storageAddress = localStorage.getItem('userData')
            const userAddress = storageAddress ? JSON.parse(storageAddress) : null

            // Se usuário está logado, verifica no Firebase
            if (user) {
                const addressProfile = await getData('users')

                if (!addressProfile) throw new Error('Endereço não informado')
                setAddress(address)

                if (!addressProfile?.data) {
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

            // orderFinished && addOrderGuests(order, random)
        } else {

            const orderFinished = {
                orderId: random,
                ...address,
                cart: {
                    ...cartItensArray
                }
            }

            // orderFinished && addDataToFireCollection('orders_users', orderFinished)
        }

        // console.log(orderFinished)
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

    const handleNext = () => {
        if (step === 1) setStep(2);
    };

    const handlePrevious = () => {
        if (step === 2) setStep(1);
    };


    // Verificando forms inputs
    function verifyFormInputs() {
        return (
            formData.cidade.trim() !== '' &&
            formData.sobrenome.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.nome.trim() !== '' &&
            formData.bairro.trim() !== '' &&
            formData.numero.trim() !== '' &&
            formData.telefone.trim() !== '' &&
            formData.CEP.trim() !== '' &&
            formData.CEP.trim().length === 8 &&
            formData.rua.trim() !== ''
        )
    }

    function handleSumit(e: React.FormEvent) {
        e.preventDefault()

        if (!verifyFormInputs()) return

        handleNext()

        const userData = {
            nome: formData.nome,
            sobrenome: formData.sobrenome,
            email: formData.email,
            telefone: formData.telefone,
            cidade: formData.cidade,
            complemento: formData.complemento,
            bairro: formData.bairro,
            numero: formData.numero,
            CEP: formData.CEP,
            rua: formData.rua,
        }

        setUserData(userData)
    }

    useEffect(() => {
        cartItensArray.length === 0 && router?.push('/')
    }, [])

    useEffect(() => {
        user && setStep(2)
        !user && setStep(1)
    }, [user])


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
            <div className="mt-5 md:mt-0 w-full sm:p-2 relative">
                {/* <h1 className='block md:hidden text-2xl font-bold text-center my-4'>Endereço</h1> */}
                <div className=" flex flex-col md:flex-row min-h-130 gap-x-4">
                    <div className="md:w-1/3 md:mb-0 rounded-lg mt-2 order-2 ">
                        <OrderSummary />
                    </div>

                    <div className="md:w-2/3 w-full pt-0 min-h-full">
                        {!user && (step === 1 && (
                            <motion.div className='basicStyle relative m-auto p-4 mb:p-0 flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <form className=' min-h-full flex flex-col justify-between' onSubmit={handleSumit}>
                                    <h3 className={`text-lg font-semibold mb-2 text-gray-700`}>Detalhes pessoais</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            name="nome"
                                            onChange={handleChange}
                                            value={formData.nome}
                                            placeholder="nome"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            autoComplete='on'
                                            required />
                                        <input
                                            name="sobrenome"
                                            onChange={handleChange}
                                            value={formData.sobrenome}
                                            placeholder="sobrenome"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            autoComplete='on'
                                            required />
                                    </div>

                                    <h3 className={`text-lg font-semibold mb-2 text-gray-700`}>{step === 1 ? 'Endereço de entrega' : 'Pagamento'}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            name="rua"
                                            onChange={handleChange}
                                            value={formData.rua}
                                            placeholder="Endereço rua/Avenida"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            autoComplete='on'
                                            required />
                                        <input
                                            name="bairro"
                                            onChange={handleChange}
                                            value={formData.bairro}
                                            placeholder="bairro"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            autoComplete='on'
                                            required />
                                        <input
                                            name="CEP"
                                            type='number' onChange={handleChange}
                                            value={formData.CEP}
                                            placeholder="CEP"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            autoComplete='on'
                                            required />
                                        <input
                                            name="cidade"
                                            onChange={handleChange}
                                            value={formData.cidade}
                                            placeholder="cidade"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            autoComplete='on'
                                            required />
                                        <input
                                            name="numero"
                                            onChange={handleChange}
                                            value={formData.numero}
                                            placeholder="Número"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            autoComplete='on'
                                            required />
                                        <input
                                            name="complemento"
                                            onChange={handleChange}
                                            value={formData.complemento}
                                            placeholder="complementoo"
                                            className={step === 1 ? 'red_input' : 'input'} />
                                    </div>

                                    <h3 className={`text-lg font-semibold mb-2 text-gray-700`}>Contato</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <input
                                            name="telefone"
                                            type='number'
                                            onChange={handleChange}
                                            value={formData.telefone}
                                            placeholder="Número para contato"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            required />
                                        <input
                                            name="email"
                                            onChange={handleChange}
                                            value={formData.email}
                                            placeholder="Email"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            required />
                                    </div>
                                    <button type='submit' className="bg-[#db3935] hover:bg-[#d8241f] py-3 px-4 rounded-lg text-white w-full md:max-w-70 m-auto md:m-0">Next</button>
                                </form>
                            </motion.div>
                        ))}

                        {IsValidAddress && (step === 2 && (
                            <motion.div className='basicStyle relative m-auto p-4 mb:p-0 h-full flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Pagamento</h3>
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
                        {/* {!IsValidAddress &&
                            <motion.div className='basicStyle relative m-auto p-4 mb:p-0 h-full flex flex-col items-center justify-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Image src={`/address3.svg`} alt="logo carrinho vazio" priority quality={50} width={500} height={500} className="opacity-40 mb-4" />
                                <p>Dados de Endereço não fornecidos!</p>
                            </motion.div>
                        } */}
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
