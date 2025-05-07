'use client'

// Recursos next
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

// Components
import { ContentContainer } from "@/components/home/Container";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";

export default function Login() {
    const { data: session } = useSession();

    if (session) {
        redirect('/')
    };

    return (
        <section className="relative h-screen flex items-end overflow-hidden bg-white lg:ml-16 lg:max-w-screen">
            <Link href={'/'} className="absolute top-4 left-4 z-5 flex gap-x-2 lg:hidden">
                <FaHome size={18} className="text-white md:text-gray-700" />
                <span className="hidden md:block text-sm">Pagina Inicial</span>
            </Link>
            {/* Lado da imagem */}
            <div className="absolute w-full md:relative md:w-1/2 h-full order-1">
                <Image
                    src="/chef.jpg" // imagem em public/
                    alt="Imagem de um chef preparando prato"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover object-bottom"
                />
            </div>

            {/* Lado do login */}
            <div className="w-full flex items-start justify-center p-6 z-2 bg-white sm:h-[80%] rounded-t-4xl md:w-1/2 md:h-screen md:items-center">
                <div className="max-w-[80%] w-full flex flex-col justify-around space-y-5 text-center lg:max-w-[70%] ">
                    <figure className="flex justify-center lg:rounded-t-4xl lg:rounded-b-4xl">
                        <Image src='/logoIcon.svg' width={50} height={50} alt="Logo paraíso da gastronomia" />
                    </figure>
                    <h1 className="text-3xl mb-4 font-bold text-gray-800">
                        Bem-vindo de volta
                    </h1>
                    <p className=" text-gray-600 text-lg md:block">
                        Faça login para acessar sua conta.
                    </p>


                    {/* Form login */}
                    <form className="flex flex-col gap-y-3">
                        <label>
                            <input type="text" placeholder="E-mail" className="input" required />
                        </label>
                        <label>
                            <input type="password" placeholder="Senha" className="input" required />
                        </label>
                        <a href="" className="my-2">Esqueceu sua senha?</a>
                        <button className="button_primary_large">Entrar</button>
                        <span className="inline-flex items-center">
                            <hr className="w-1/2 text-slate-300" />
                            <p className="mx-1 text-slate-500">ou</p>
                            <hr className="w-1/2 text-slate-300" />
                        </span>
                        {/* Button de login */}
                        <button onClick={() => signIn('google')} className='flex items-center justify-center gap-x-3 border-slate-200 border-1 w-full bg-white hover:bg-[#4283f1] text-slate-600 hover:text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200'>
                            <p>Entrar com Google</p>
                            <FcGoogle size={24} />
                        </button>

                    </form>
                    <p className="text-sm text-gray-500 hover:text-gray-800">
                        <Link href={'/signup'}>Ainda não tem uma conta?</Link>
                    </p>
                </div>
            </div>
        </section >
    )
}
