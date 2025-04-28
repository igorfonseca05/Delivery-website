

import { MenuLinks } from "../Links"
import { FaSignInAlt, FaUserPlus, FaCog } from "react-icons/fa"

import Link from "next/link"

export function End_Icons() {
    return (
        <ul className="relative w-full flex flex-col justify-center items-center gap-y-2 part-2">
            <li className="group/lihover sidemenu-item lg:hidden">
                <Link href='/login' className="sidemenu-link">
                    <FaSignInAlt className="min-w-5" />
                    <p className="sidemenu-innerText">Entrar</p>
                </Link>
            </li>
            <li className="group/lihover sidemenu-item lg:hidden">
                <Link href='/login' className="sidemenu-link">
                    <FaUserPlus className="min-w-5" />
                    <p className="sidemenu-innerText">Cadastrar</p>
                </Link>
            </li>
            <MenuLinks href="/config" icon={FaCog} innerText="Configurações" />
        </ul>
    )
}