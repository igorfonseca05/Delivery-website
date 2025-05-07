import { ContentContainer } from "@/components/homeComponents/Container";
import Image from "next/image";
import Link from "next/link";

import { FaHome } from "react-icons/fa";

// app/signup/page.tsx (ou .jsx)
export default function SignupForm() {
    return (
        <div className="flex items-end relative max-w-screen h-screen overflow-hidden bg-white md:items-center lg:ml-16 lg:max-w-screen">
            <Link href={'/'} className="absolute top-4 left-4 z-6 flex gap-x-2 lg:hidden ">
                <FaHome size={18} className="text-white md:text-gray-700" />
                <span className="hidden md:block text-sm">Pagina Inicial</span>
            </Link>
            {/* Left side - Welcome */}
            <div className="absolute w-full md:relative md:w-1/2 h-full order-1">
                <Image
                    src="/signUp.jpg" // imagem em public/
                    alt="Imagem de um chef preparando prato"
                    width={800}
                    height={800}
                    quality={100}
                    className="w-full h-full object-cover object-center md:object-center"
                />
            </div>

            {/* Right side - Sign Up */}
            <div className=" h-[80%] bg-white p-6 rounded-t-4xl flex flex-col justify-center items-center z-5 md:w-1/2 lg:p-10">
                <Image src='/logoIcon.svg' width={50} height={50} alt="Logo paraíso da gastronomia" />
                <h2 className="text-2xl font-semibold mb-2">Criar Conta</h2>
                <p className="text-sm mb-6 text-gray-500">Ou cadastre-se com seu e-mail</p>

                <form className="space-y-4 w-full lg:w-[80%]">
                    <input
                        type="text"
                        placeholder="Nome"
                        className="input"
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="input"
                    />
                    <button className="buttonStyle_active w-full">
                        Cadastrar
                    </button>
                    <p className="text-sm text-gray-500 text-center hover:text-gray-800">
                        <Link href={'/login'}>Já possui uma conta?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
