"use client"


import clsx from 'clsx'
import { useEffect, useState } from "react"
import UserSidebar from "./userSidebar/userSideBar"
import { ContentContainer } from "@/components/globalComponents/Container/container"

import { useAuthContext } from "../../../../context/useAuthContext"

import { useFirebase } from "../../../../hooks/useFirebase"
import { address } from 'framer-motion/client'
import { toast } from 'react-toastify'


export default function ProfilePage() {
    const { addDataToFireCollection, loading, getData, success } = useFirebase()
    const { user } = useAuthContext()

    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        cidade: "",
        estado: "",
        CEP: "",
        país: "Brasil",
        metodoPagamento: "Pix",
        detalhesEntrega: "",
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Dados salvos:", form)

        const userData = {
            ...form
        }

        addDataToFireCollection('users', userData)
        // Aqui você integraria com sua API ou backend
    }


    useEffect(() => {
        async function getUserAddress() {
            const address = await getData('users')

            setForm(prev => ({
                ...prev,
                ...address?.data
            }))

        }
        getUserAddress()
    }, [])


    useEffect(() => {
        success && toast.success(success)
    }, [success])



    return (
        <ContentContainer>
            <div className='basicStyle p-2'>
                <h1 className='text-[clamp(1rem,2vw,2rem)] font-bold text-center md:text-start md:pl-3 text-gray-500'>Editar perfil</h1>
                {/* <p className='text-gray-400 text-[clamp(0.8rem,1vw,2rem)] '>Entre com as informações abaixo para registrar. Você pode altere-las a qualquer momento</p> */}
            </div>

            <div className="flex flex-col wrap gap-2 md:flex-row">
                <UserSidebar
                    name={`${user?.displayName}`}
                    email={`${user?.email}`}
                    url={`${user?.photoURL}`} // coloque sua imagem aqui
                />
                <div className="flex-1">
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
                        {/* <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1> */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-500">Nome Completo</label>
                                <input
                                    name="nome"
                                    type="text"
                                    value={form.nome}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-500">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-500">Telefone</label>
                                <input
                                    name="telefone"
                                    type="text"
                                    value={form.telefone}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-500">Método de Pagamento</label>
                                <select
                                    name="metodoDePagamento"
                                    value={form.metodoPagamento}
                                    onChange={handleChange}
                                    className="input"
                                    required>
                                    {/* <option value="">Selecione</option> */}
                                    <option value="pix">Pix</option>
                                    {/* <option value="cartao">Cartão de Crédito</option>
                                    <option value="dinheiro">Dinheiro</option> */}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Endereço</label>
                                <input
                                    name="endereco"
                                    type="text"
                                    value={form.endereco}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Cidade</label>
                                <input
                                    name="cidade"
                                    type="text"
                                    value={form.cidade}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Estado</label>
                                <input
                                    name="estado"
                                    type="text"
                                    value={form.estado}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">CEP</label>
                                <input
                                    name="CEP"
                                    type="text"
                                    value={form.CEP}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">País</label>
                                <input
                                    name="país"
                                    type="text"
                                    value={form.país}
                                    onChange={handleChange}
                                    className="input"
                                    required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Instruções de Entrega</label>
                                <textarea name="detalhesEntrega" value={form.detalhesEntrega} onChange={handleChange} className="input h-24" />
                            </div>
                            <div className="md:col-span-2">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className={clsx(
                                        'px-4 py-2 w-full rounded-lg text-white transition',
                                        loading
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    )}
                                >
                                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </ContentContainer>
    )
}
