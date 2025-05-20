'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentContainer } from '@/components/globalComponents/Container/container';

export default function CheckoutForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        street2: '',
        postCode: '',
        city: '',
        country: '',
        phone: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step === 1) setStep(2);
    };

    return (
        <ContentContainer>
            <div className="bg-white shadow-lg rounded-lg w-full p-6 relative">

                <div className="flex flex-col md:flex-row min-h-130 ">
                    <div className="md:w-1/3 mb-6 md:mb-0 border-r border-gray-300 pr-4 imageBg">
                        <h2 className="text-xl font-semibold text-[#ffb443] mb-4">Endereço de entrega</h2>
                        <ul className="space-y-4">
                            <li className={step === 1 ? 'text-[#ffb443] font-bold' : 'text-gray-500'}>1. Endereço</li>
                            <li className={step === 2 ? 'text-[#ffb443] font-bold' : 'text-gray-500'}>2. Payment</li>
                        </ul>
                    </div>

                    <div className="md:w-2/3 w-full min-h-full pl-4">
                        {step === 1 && (
                            <motion.div className='h-full flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Detalhes pessoais</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input name="firstName" onChange={handleChange} value={formData.firstName} placeholder="Nome" className="input" />
                                    <input name="lastName" onChange={handleChange} value={formData.lastName} placeholder="Sobrenome" className="input" />
                                </div>

                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Endereço de entrega</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input name="street" onChange={handleChange} value={formData.street} placeholder="Endereço Rua/Avenida" className="input" />
                                    <input name="street2" onChange={handleChange} value={formData.street2} placeholder="Street Address (optional)" className="input" />
                                    <input name="postCode" onChange={handleChange} value={formData.postCode} placeholder="Post Code" className="input" />
                                    <input name="city" onChange={handleChange} value={formData.city} placeholder="City" className="input" />
                                    <input name="country" onChange={handleChange} value={formData.country} placeholder="Country" className="input" />
                                </div>

                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Contato</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <input name="phone" onChange={handleChange} value={formData.phone} placeholder="Your Phone Number" className="input" />
                                    <input name="email" onChange={handleChange} value={formData.email} placeholder="Your Email Address" className="input" />
                                </div>

                                <button onClick={handleNext} className="button_primary_large max-w-50 m-auto md:m-0">Next</button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Pagamento</h3>
                                <p className="mb-4">Aqui você pode gerar o QR Code do Pix e monitorar o pagamento.</p>
                                <div className="bg-gray-100 rounded p-6 flex items-center justify-center">
                                    <span className="text-gray-500">[QR Code Pix Aqui]</span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
