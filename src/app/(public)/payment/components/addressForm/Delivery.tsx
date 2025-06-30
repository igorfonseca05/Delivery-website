import { motion } from 'framer-motion';

import { useState } from 'react';
import { UserData } from '../../../../../../utils/types/types';

import GetOrderContainer from '../getOrderContainer/getOrderContainer';
import { ArrowRight } from 'lucide-react';

interface DeliveryProps {
    formData: UserData,
    setFormData: (FormData: UserData) => void,
    handleFormSubmit: (e: React.FormEvent) => void,
    // getOrder: string
    // setGetOrder: (getOrder: string) => void
    // step: number
}

export default function Delivery({ formData, setFormData, handleFormSubmit }: DeliveryProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.div className='basicStyle relative m-auto mb:p-0 flex flex-col justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className='text-[clamp(1.2rem,1em,2rem)] mb-2 font-extrabold'>Adicione seu endereço de Entrega</h1>
            {/* <p className='my-3 text-gray-500 text-[clamp(0.8rem,0.8em,2rem)]'>* Obrigatórios</p> */}
            <form className='min-h-full flex flex-col justify-between py-2' onSubmit={handleFormSubmit}>
                <h3 className={`text-sm font-medium text-gray-700 mb-2`}>Dados pessoais *</h3>
                <div className="flex gap-4 mb-4">
                    <input
                        name="nome"
                        onChange={handleInputChange}
                        value={formData.nome}
                        placeholder="Nome"
                        className='input'
                        autoComplete='on'
                        required
                    />
                    <input
                        name="sobrenome"
                        onChange={handleInputChange}
                        value={formData.sobrenome}
                        placeholder="Sobrenome"
                        className='input'
                        autoComplete='on'
                        required />
                </div>

                <h3 className={`text-sm font-medium text-gray-700 mb-2`}>Endereço *</h3>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        name="rua"
                        onChange={handleInputChange}
                        value={formData.rua}
                        placeholder="Endereço rua/Avenida"
                        className='input'
                        autoComplete='on'
                        required />
                    <input
                        name="bairro"
                        onChange={handleInputChange}
                        value={formData.bairro}
                        placeholder="Bairro"
                        className='input'
                        autoComplete='on'
                        required />
                </div>

                <div className='paymentFormInput'>
                    <input
                        name="CEP"
                        type='number' onChange={handleInputChange}
                        value={formData.CEP}
                        placeholder="CEP"
                        className='input'
                        autoComplete='on'
                        required />
                    <input
                        name="cidade"
                        onChange={handleInputChange}
                        value={formData.cidade}
                        placeholder="Cidade"
                        className='input'
                        autoComplete='on'
                        required />
                </div>

                <div className='paymentFormInput'>
                    <input
                        name="numero"
                        onChange={handleInputChange}
                        value={formData.numero}
                        placeholder="Número"
                        className='input'
                        autoComplete='on'
                        required />
                    <input
                        name="complemento"
                        onChange={handleInputChange}
                        value={formData.complemento}
                        placeholder="Complementoo"
                        className='input' />
                </div>

                <h3 className={`text-sm font-medium text-gray-700 mb-2`}>Contato *</h3>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        name="telefone"
                        type='number'
                        onChange={handleInputChange}
                        value={formData.telefone}
                        placeholder="Número para contato"
                        className='input'
                        required />
                    <input
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                        placeholder="Email"
                        className='input'
                        required />
                </div>
                <div className='flex justify-end'>
                    <button type='submit' id='formButton' className="buttonColor flex items-center justify-center gap-x-2 px-20 py-3 w-full md:max-w-70 m-auto md:m-0">Proximo <ArrowRight size={18} /> </button>
                </div>
            </form>
        </motion.div >
    );
};