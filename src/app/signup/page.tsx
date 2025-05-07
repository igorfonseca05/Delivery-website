'use client'

// Recursos internos next
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth/useAuth";
import { toast } from "react-toastify";

//Icons
import { FaHome } from "react-icons/fa";


export default function SignupForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { createUser, loading, error } = useAuth()

    const handleSignUpForm = async (e: FormEvent) => {
        e.preventDefault()
        const user = { name, email, password }
        createUser(user)
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])


    return (
        <div className="flex items-end relative max-w-screen h-screen overflow-hidden bg-white md:items-center lg:ml-16 lg:max-w-screen">

            {/* Botão Home Mobile */}
            <Link href={'/'} className="absolute top-4 left-4 z-6 flex gap-x-2 lg:hidden ">
                <FaHome size={18} className="text-white md:text-gray-700" />
                <span className="hidden md:block text-sm">Pagina Inicial</span>
            </Link>

            {/* Left side - Imagem*/}
            <div className="absolute w-full md:relative md:w-1/2 h-full order-1">
                <Image
                    src="/signUp.jpg"
                    alt="Imagem de um chef preparando prato"
                    width={800}
                    height={800}
                    quality={100}
                    className="w-full h-full object-cover object-center md:object-center"
                />
            </div>

            {/* Right side - Form */}
            <div className=" h-[80%] bg-white p-6 rounded-t-4xl flex flex-col justify-center items-center z-5 md:w-1/2 lg:p-10">

                <Image src='/logoIcon.svg' width={50} height={50} alt="Logo paraíso da gastronomia" />
                <h2 className="text-2xl font-semibold mb-2">Criar Conta</h2>
                <p className="text-sm mb-6 text-gray-500">Ou cadastre-se com seu e-mail</p>

                <form className="space-y-4 w-full lg:w-[80%]" onSubmit={handleSignUpForm}>
                    <input
                        type="text"
                        placeholder="Nome"
                        className="input"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="input"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="input"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button disabled={loading} className={`button_primary_large w-full  ${loading && 'cursor-not-allowed'}`}>
                        {loading ? ' Aguarde' : ' Criar cadastro'}
                    </button>

                    {/* Botão Google */}
                    <p className="text-sm text-gray-500 text-center hover:text-gray-800">
                        <Link href={'/login'}>Já possui uma conta?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
