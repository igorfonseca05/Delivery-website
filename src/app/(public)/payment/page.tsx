'use client'

import React, { useEffect, useState } from 'react';
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


export default function CheckoutForm() {
    const router = useRouter()

    const { setUserData, cartItensArray, setCartItensArray } = useCartContext()
    const { user } = useAuthContext()

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        rua: '',
        cidade: '',
        bairro: '',
        CEP: '',
        numero: '',
        complemento: '',
        telefone: '',
        email: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handlePayment() {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setSuccess(true)

            setTimeout(() => {
                generateOrderNumber()
                setSuccess(false)
                setCartItensArray([])
            }, 3000)
        }, 4000)
    }

    const handleNext = () => {
        if (step === 1) setStep(2);
    };

    const handlePrevious = () => {
        if (step === 2) setStep(1);
    };

    function generateOrderNumber() {
        const random = randomBytes(4).toString('hex')
        setOrderId(random)
    }


    useEffect(() => {
        cartItensArray.length === 0 && router?.push('/')
    }, [])


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
            email: formData.email,
            telefone: formData.telefone,
            endereco: {
                cidade: formData.cidade,
                complemento: formData.complemento,
                bairro: formData.bairro,
                numero: formData.numero,
                CEP: formData.CEP,
                rua: formData.rua,
            },
        }

        setUserData(userData)
    }

    useEffect(() => {
        setStep(2)
    }, [user])

    return (
        <ContentContainer>
            <div className="bg-white shadow-lg rounded-lg w-full p-3 sm:p-6 relative">
                <h1 className='block md:hidden text-2xl font-bold text-center my-4'>Endereço</h1>
                <div className=" flex flex-col md:flex-row min-h-130 gap-x-4">
                    {/* <div className="md:w-1/3 mb-6 md:mb-0 border-r border-gray-300">
                        <h2 className={`text-3xl font-bold mb-4 ${step === 1 ? 'text-[#d8241f]' : 'text-[#ffb443]'}`}>{step === 1 ? 'Endereço de entrega' : 'Pagamento'}</h2>
                        <ul className="space-y-4">
                            <li className={` ${step === 1 ? 'text-xl font-bold text-gray-500' : 'text-gray-500'}`}>1. Endereço</li>
                            <li className={` ${step === 2 ? 'text-xl font-bold text-gray-500' : 'text-gray-500'}`}>2. Pagamento</li>
                        </ul>
                        {step === 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Image className={`hidden md:block animate`} src={step === 1 ? '/address2.svg' : '/pay.svg'} width={380} height={380} alt='logo pagamentos' />
                        </motion.div>}
                        {step === 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Image className={`hidden md:block animate`} src={'/pay.svg'} width={380} height={380} alt='logo pagamentos' />
                        </motion.div>}
                    </div> */}

                    <div className="md:w-1/3 mb-6 md:mb-0 rounded-lg md:order-3 ">
                        <OrderSummary />
                    </div>

                    <div className="md:w-2/3 w-full min-h-full sm:pl-4">
                        {!user && (step === 1 && (
                            <motion.div className='h-full' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <form className=' min-h-full flex flex-col justify-between' onSubmit={handleSumit}>
                                    <h3 className={`text-lg font-semibold mb-2 text-gray-700`}>Detalhes pessoais</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            name="nome"
                                            onChange={handleChange}
                                            value={formData.nome}
                                            placeholder="nome"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            required />
                                        <input
                                            name="sobrenome"
                                            onChange={handleChange}
                                            value={formData.sobrenome}
                                            placeholder="sobrenome"
                                            className={step === 1 ? 'red_input' : 'input'}
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
                                            required />
                                        <input
                                            name="bairro"
                                            onChange={handleChange}
                                            value={formData.bairro}
                                            placeholder="bairro"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            required />
                                        <input
                                            name="CEP"
                                            type='number' onChange={handleChange}
                                            value={formData.CEP}
                                            placeholder="CEP"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            required />
                                        <input
                                            name="cidade"
                                            onChange={handleChange}
                                            value={formData.cidade}
                                            placeholder="cidade"
                                            className={step === 1 ? 'red_input' : 'input'}
                                            required />
                                        <input
                                            name="numero"
                                            onChange={handleChange}
                                            value={formData.numero}
                                            placeholder="Número"
                                            className={step === 1 ? 'red_input' : 'input'}
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

                        {step === 2 && (
                            <motion.div className='h-full flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <header>
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Pagamento</h3>
                                    {!orderId && <p className="mb-4">Mire a camera do celular para o QR code abaixo para efetuar o pagamento</p>}
                                </header>
                                <div className='flex flex-col justify-center items-center'>
                                    {!loading && !success && !orderId && <QRcode handlePayment={handlePayment} />}
                                    {loading && <Loading />}
                                    {success && <Success setSuccess={setSuccess} />}
                                    {orderId && <FinishedOrder orderId={orderId} />}
                                    {/* {success && <Failure />} */}
                                </div>
                                {!orderId && <button onClick={handlePrevious} className={`button_primary_large max-w-50 m-auto md:m-0 ${user && 'opacity-0 pointer-events-none'}`}>Previous</button>}
                                {orderId && <Link href={'/'} className="button_primary_large text-center max-w-50 m-auto md:text-end">Página inicial</Link>}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
