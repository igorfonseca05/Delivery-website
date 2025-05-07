"use client"

import { useState } from "react"
import UserSidebar from "./userSidebar"
import { ContentContainer } from "@/components/home/Container"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function ProfilePage() {
    const { data: session } = useSession()
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "Brasil",
        paymentMethod: "",
        deliveryInstructions: "",
    })


    !session && redirect('/login')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Dados salvos:", form)
        // Aqui você integraria com sua API ou backend
    }

    return (
        <ContentContainer>
            <div className="p-2 flex flex-col wrap gap-4 md:flex-row">
                <UserSidebar
                    name={`${session?.user?.name}`}
                    email={`${session?.user?.email}`}
                    url={`${session?.user?.image}`} // coloque sua imagem aqui
                />
                <div className="flex-1">
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nome Completo</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange} className="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} className="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Telefone</label>
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Método de Pagamento</label>
                                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="input">
                                    <option value="">Selecione</option>
                                    <option value="pix">Pix</option>
                                    <option value="cartao">Cartão de Crédito</option>
                                    <option value="dinheiro">Dinheiro</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Endereço</label>
                                <input type="text" name="address" value={form.address} onChange={handleChange} className="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Cidade</label>
                                <input type="text" name="city" value={form.city} onChange={handleChange} className="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Estado</label>
                                <input type="text" name="state" value={form.state} onChange={handleChange} className="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">CEP</label>
                                <input type="text" name="zip" value={form.zip} onChange={handleChange} className="input" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">País</label>
                                <input type="text" name="country" value={form.country} onChange={handleChange} className="input" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Instruções de Entrega</label>
                                <textarea name="deliveryInstructions" value={form.deliveryInstructions} onChange={handleChange} className="input h-24" />
                            </div>
                            <div className="md:col-span-2">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </ContentContainer>
    )
}
