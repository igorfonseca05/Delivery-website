
import { MenuLinks } from "./Links"

import { FaHome, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

import { SearchBar } from "./input"

import { LoginButton } from "@/components/navbar/loginButton/loginButton"
import { FaCog } from "react-icons/fa"

export function Middle_Icons() {
    return (
        <div className="grow mt-4 flex flex-col justify-between">
            <ul className="relative w-full flex flex-col justify-between items-center gap-y-5 mt-2 part-1">
                <SearchBar />
                <MenuLinks href="/" icon={FaHome} innerText="Página inicial" />
                <MenuLinks href="/about" icon={FaUsers} innerText="Sobre nós" />
                <MenuLinks href="/about" icon={FaMapMarkerAlt} innerText="Área de entrega" />
                <MenuLinks href="/about" icon={FaClock} innerText="Horários" />
            </ul>

            <ul className="relative w-full flex flex-col justify-center items-center gap-y-2 part-2">
                <li className="group/lihover sidemenu-item md:hidden">
                    <LoginButton style={'sidemenu-link'} />
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