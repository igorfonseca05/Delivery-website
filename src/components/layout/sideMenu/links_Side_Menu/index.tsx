// Este é componente container do SideMenu

// Components
import { MenuLinks } from "./Links"
import { SearchBar } from "./input"
import { LoginButton } from "@/components/layout/navbar/loginButton/loginButton"

// Icons
import { FaHome, FaUsers, FaMapMarkerAlt, FaClock, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FaCog } from "react-icons/fa"

// Contexts
import { useSession } from "next-auth/react"

export function Middle_Icons() {
    // const { data: session } = useSession()

    return (
        <div className="grow mt-4 flex flex-col justify-between">

            {/* SideMenu buttons */}
            <ul className="relative w-full max-h-100 py-4 flex flex-col justify-between items-center gap-y-5 mt-2 sidebar overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
                <SearchBar />
                <MenuLinks href="/" icon={FaHome} innerText="Página inicial" />
                {/* {session && (
                    <>
                        <MenuLinks href="/about" icon={FaHeart} innerText="Favoritos" />
                        <MenuLinks href="/about" icon={FaShoppingCart} innerText="Minhas Compras" />
                        <MenuLinks href="/about" icon={FaClock} innerText="Horários" />
                    </>
                )} */}
                <MenuLinks href="/about" icon={FaUsers} innerText="Sobre nós" />
                <MenuLinks href="/about" icon={FaMapMarkerAlt} innerText="Área de entrega" />
                <MenuLinks href="/about" icon={FaClock} innerText="Horários" />
            </ul>

            {/* Footer SideMenu */}
            <ul className="relative w-full flex flex-col justify-center items-center gap-y-2 part-2">
                <li className="group/lihover sidemenu-item md:hidden">
                    <LoginButton style={'sidemenu-link'} innerText="Entrar" />
                </li>
                {/* <li className="group/lihover sidemenu-item md:hidden">
                        <Link href='/login' className="sidemenu-link">
                            <FaUserPlus className="min-w-5" />
                            <p className="sidemenu-innerText">Cadastrar</p>
                        </Link>
                    </li> */}
                <MenuLinks href="/config" icon={FaCog} innerText="Configurações" />
            </ul>
        </div>

    )
}