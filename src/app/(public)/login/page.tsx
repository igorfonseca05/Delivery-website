
// Recursos next
import Image from "next/image";
import Link from "next/link";

// Icons
import { FaHome } from "react-icons/fa";

// Components
import Form from "./form/Form";


export default function Login() {

    return (
        <section className="relative h-screen flex items-end overflow-hidden bg-white lg:ml-16 lg:max-w-screen">
            <Link href={'/'} className="absolute top-4 left-4 z-5 flex gap-x-2 lg:hidden">
                <FaHome size={18} className="text-gray-700" />
                <span className="hidden md:block text-sm">Pagina Inicial</span>
            </Link>

            {/* Lado da imagem */}
            <div className="absolute w-full hidden md:flex md:relative md:w-1/2 h-full order-1">
                <Image
                    src="/chef.jpg" // imagem em public/
                    alt="Imagem de um chef preparando prato"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover object-bottom"
                />
            </div>

            {/* Lado do login */}
            <div className="w-full h-full bg-white flex items-center justify-center z-2 sm:h-[80%] md:w-1/2 md:h-screen md:items-center">
                <div className=" w-full flex flex-col p-4 justify-around space-y-5 text-center lg:max-w-[70%] ">
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
                    <Form />

                    <p className="text-sm text-gray-500 hover:text-gray-800">
                        <Link href={'/signup'}>Ainda não tem uma conta?</Link>
                    </p>
                </div>
            </div>
        </section >
    )
}
