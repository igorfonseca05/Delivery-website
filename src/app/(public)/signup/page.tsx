

// Recursos internos next
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/compat/router";

//Icons
import { FaHome } from "react-icons/fa";
import SignUp_Form from "./SignupForm/Signup_Form";


export default function SignupForm() {

    return (
        <div className="flex items-end relative max-w-screen h-screen overflow-hidden bg-white md:items-center lg:ml-16 lg:max-w-screen">

            {/* Botão Home Mobile */}
            <Link href={'/'} className="absolute top-4 left-4 z-6 flex gap-x-2 lg:hidden ">
                <FaHome size={18} className="text-gray-500" />
                <span className="hidden md:block text-sm">Pagina Inicial</span>
            </Link>

            {/* Left side page*/}
            <div className="absolute w-full hidden md:flex md:relative md:w-1/2 h-full order-1">
                <Image
                    src="/signUp.jpg"
                    alt="Imagem de um chef preparando prato"
                    width={800}
                    height={800}
                    quality={100}
                    className="w-full h-full object-cover object-center md:object-center"
                />
            </div>

            {/* Right side page*/}
            <div className="h-full bg-white p-4 flex flex-col justify-center items-center z-5 md:w-1/2 lg:p-10">
                <Image src='/logoIcon.svg' width={50} height={50} alt="Logo paraíso da gastronomia" />
                <h2 className="text-2xl font-semibold mb-2">Criar Conta</h2>
                <p className="text-sm mb-6 text-gray-500">Ou cadastre-se com seu e-mail</p>
                <SignUp_Form />
            </div>
        </div>
    );
}
