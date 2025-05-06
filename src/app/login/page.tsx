'use client'


import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

import chef from '../../../public/chef.jpg'

export default function Login() {


    return (
        <>
            <section className="flex h-screen overflow-hidden">

                {/* Lado da imagem */}
                <div className="hidden md:flex w-1/2 h-full order-1">
                    <Image
                        src="/chef.jpg" // imagem em public/
                        alt="Imagem de um chef preparando prato"
                        width={800}
                        height={800}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Lado do login */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                    <div className="max-w-md w-full h-[60%] flex flex-col justify-around space-y-6">
                        <Image src='/logo.svg' width={150} height={150} alt="Logo paraíso da gastronomia" />
                        <h1 className="text-3xl font-bold text-gray-800">
                            Bem-vindo de volta ao <br /> Paraíso da Gastronomia
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Faça login para acessar sua conta, acompanhar pedidos, gerenciar preferências e muito mais.
                        </p>
                        <p className="text-sm text-gray-500">
                            Ainda não tem uma conta? O cadastro é rápido e o sabor é garantido 🍽️
                        </p>

                        {/* Button de login */}
                        <button className='flex items-center justify-center gap-x-3 border-slate-200 border-1 w-full bg-white hover:bg-[#4283f1] text-slate-600 hover:text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200'>
                            <p>Entrar com Google</p>
                            <FcGoogle size={24} />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}