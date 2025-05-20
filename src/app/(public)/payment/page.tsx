'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentContainer } from '@/components/globalComponents/Container/container';
import Image from 'next/image';
import { Success } from './components/sucessLogo/Success';
import { Loading } from './components/loading/Loading';
import QRcode from './components/QRcontainer/QRcode';
import Failure from './components/Failure/Failure';

export default function CheckoutForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        neighborhood: '',
        postCode: '',
        number: '',
        complement: '',
        phone: '',
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
            formData.city.trim() !== '' &&
            formData.lastName.trim() !== '' &&
            formData.complement.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.firstName.trim() !== '' &&
            formData.neighborhood.trim() !== '' &&
            formData.number.trim() !== '' &&
            formData.phone.trim() !== '' &&
            formData.postCode.trim() !== '' &&
            formData.street.trim() !== ''
        )
    }

    function handleSumit(e: React.FormEvent) {
        e.preventDefault()

        if (verifyFormInputs()) {
            handleNext()
        }
    }

    return (
        <ContentContainer>
            <div className="bg-white shadow-lg rounded-lg w-full p-3 sm:p-6 relative">
                <div className=" flex flex-col md:flex-row min-h-130">
                    <div className="md:w-1/3 mb-6 md:mb-0 border-r border-gray-300">
                        <h2 className={`text-xl font-semibold mb-4 ${step === 1 ? 'text-[#d8241f]' : 'text-[#ffb443]'}`}>Endereço de entrega</h2>
                        <ul className="space-y-4">
                            <li className={step === 1 ? 'text-[#d8241f] font-bold' : 'text-gray-500'}>1. Endereço</li>
                            <li className={step === 2 ? 'text-[#ffb443] font-bold' : 'text-gray-500'}>2. Pagamento</li>
                        </ul>
                        {step === 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Image className={`hidden md:block animate`} src={step === 1 ? '/address2.svg' : '/pay.svg'} width={380} height={380} alt='logo pagamentos' />
                        </motion.div>}
                        {step === 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Image className={`hidden md:block animate`} src={'/pay.svg'} width={380} height={380} alt='logo pagamentos' />
                        </motion.div>}
                    </div>

                    <div className="md:w-2/3 w-full min-h-full sm:pl-4">
                        {step === 1 && (
                            <motion.div className='h-full' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <form className=' min-h-full flex flex-col justify-between' onSubmit={handleSumit}>
                                    <h3 className={`text-lg font-semibold mb-2 ${step === 1 ? 'text-[#d8241f]' : 'text-[#ffb443]'}`}>Detalhes pessoais</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input name="firstName" onChange={handleChange} value={formData.firstName} placeholder="Nome" className={step === 1 ? 'red_input' : 'input'} required />
                                        <input name="lastName" onChange={handleChange} value={formData.lastName} placeholder="Sobrenome" className={step === 1 ? 'red_input' : 'input'} required />
                                    </div>

                                    <h3 className={`text-lg font-semibold mb-2 ${step === 1 ? 'text-[#d8241f]' : 'text-[#ffb443]'}`}>{step === 1 ? 'Endereço de entrega' : 'Pagamento'}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input name="street" onChange={handleChange} value={formData.street} placeholder="Endereço Rua/Avenida" className={step === 1 ? 'red_input' : 'input'} required />
                                        <input name="neighborhood" onChange={handleChange} value={formData.neighborhood} placeholder="Bairro" className={step === 1 ? 'red_input' : 'input'} required />
                                        <input name="postCode" type='number' onChange={handleChange} value={formData.postCode} placeholder="CEP" className={step === 1 ? 'red_input' : 'input'} required />
                                        <input name="city" onChange={handleChange} value={formData.city} placeholder="Cidade" className={step === 1 ? 'red_input' : 'input'} required />
                                        <input name="number" type='number' onChange={handleChange} value={formData.number} placeholder="Número" className={step === 1 ? 'red_input' : 'input'} required />
                                        <input name="complement" onChange={handleChange} value={formData.complement} placeholder="Complemento" className={step === 1 ? 'red_input' : 'input'} required />
                                    </div>

                                    <h3 className={`text-lg font-semibold mb-2 ${step === 1 ? 'text-[#d8241f]' : 'text-[#ffb443]'}`}>Contato</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <input name="phone" type='number' onChange={handleChange} value={formData.phone} placeholder="Número para contato" className={step === 1 ? 'red_input' : 'input'} required />
                                        <input name="email" onChange={handleChange} value={formData.email} placeholder="Email" className={step === 1 ? 'red_input' : 'input'} required />
                                    </div>
                                    <button type='submit' className="bg-[#db3935] hover:bg-[#d8241f] py-3 px-4 rounded-lg text-white max-w-70 m-auto md:m-0">Next</button>
                                </form>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div className='h-full flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <header>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Pagamento</h3>
                                    <p className="mb-4">Mire a camera do celular para o QR code abaixo para efetuar o pagamento</p>
                                </header>
                                <div className='flex flex-col justify-center items-center'>
                                    {!loading && !success && <QRcode handlePayment={handlePayment} />}
                                    {loading && <Loading />}
                                    {/* {success && <Success setSuccess={setSuccess} />} */}
                                    {success && <Failure />}
                                </div>
                                <button onClick={handlePrevious} className="button_primary_large max-w-50 m-auto md:m-0">Previous</button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
