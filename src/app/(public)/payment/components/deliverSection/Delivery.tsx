import { motion } from 'framer-motion';

import { useState } from 'react';
import { UserData } from '../../../../../../utils/types/types';

import GetOrderContainer from '../getOrderContainer/getOrderContainer';

interface DeliveryProps {
    formData: UserData,
    setFormData: (FormData: UserData) => void,
    handleFormSubmit: (e: React.FormEvent) => void,
    getOrder: string
    setGetOrder: (getOrder: string) => void
    step: number
}

export default function Delivery({ formData, setFormData, step, handleFormSubmit, setGetOrder }: DeliveryProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.div className='basicStyle relative m-auto mb:p-0 flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* <GetOrderContainer setGetOrder={setGetOrder} /> */}
            <h1 className='text-[clamp(1.2rem,1em,2rem)] mb-2 font-extrabold'>Adicione seu endereço de Entrega</h1>
            <p className='my-3 text-gray-500 text-[clamp(0.8rem,0.8em,2rem)]'>* Obrigatórios</p>
            <form className=' min-h-full flex flex-col justify-between' onSubmit={handleFormSubmit}>
                <h3 className={`text-[clamp(0.8rem,0.8em,2rem)] mb-2 text-gray-800`}>Dados pessoais *</h3>
                <div className="paymentFormInput">
                    <input
                        name="nome"
                        onChange={handleInputChange}
                        value={formData.nome}
                        placeholder="Nome"
                        className={step === 1 ? 'red_input' : 'input'}
                        autoComplete='on'
                    />
                    <input
                        name="sobrenome"
                        onChange={handleInputChange}
                        value={formData.sobrenome}
                        placeholder="Sobrenome"
                        className={step === 1 ? 'red_input' : 'input'}
                        autoComplete='on'
                        required />
                </div>

                <h3 className={`text-[clamp(0.8rem,0.8em,2rem)] mb-2 text-gray-800`}>Endereço *</h3>
                <div className="paymentFormInput">
                    <input
                        name="rua"
                        onChange={handleInputChange}
                        value={formData.rua}
                        placeholder="Endereço rua/Avenida"
                        className={step === 1 ? 'red_input' : 'input'}
                        autoComplete='on'
                        required />
                    <input
                        name="bairro"
                        onChange={handleInputChange}
                        value={formData.bairro}
                        placeholder="Bairro"
                        className={step === 1 ? 'red_input' : 'input'}
                        autoComplete='on'
                        required />
                    <input
                        name="CEP"
                        type='number' onChange={handleInputChange}
                        value={formData.CEP}
                        placeholder="CEP"
                        className={step === 1 ? 'red_input' : 'input'}
                        autoComplete='on'
                        required />
                    <input
                        name="cidade"
                        onChange={handleInputChange}
                        value={formData.cidade}
                        placeholder="Cidade"
                        className={step === 1 ? 'red_input' : 'input'}
                        autoComplete='on'
                        required />
                    <input
                        name="numero"
                        onChange={handleInputChange}
                        value={formData.numero}
                        placeholder="Número"
                        className={step === 1 ? 'red_input' : 'input'}
                        autoComplete='on'
                        required />
                    <input
                        name="complemento"
                        onChange={handleInputChange}
                        value={formData.complemento}
                        placeholder="Complementoo"
                        className={step === 1 ? 'red_input' : 'input'} />
                </div>

                <h3 className={`text-[clamp(0.8rem,0.8em,2rem)] mb-2 text-gray-800`}>Contato *</h3>
                <div className="paymentFormInput">
                    <input
                        name="telefone"
                        type='number'
                        onChange={handleInputChange}
                        value={formData.telefone}
                        placeholder="Número para contato"
                        className={step === 1 ? 'red_input' : 'input'}
                        required />
                    <input
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                        placeholder="Email"
                        className={step === 1 ? 'red_input' : 'input'}
                        required />
                </div>
                <button type='submit' className=" button_primary_large w-full md:max-w-70 m-auto md:m-0">Next</button>
            </form>
        </motion.div>
    );
};