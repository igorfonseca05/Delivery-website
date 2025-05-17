// Este é componente container do SideMenu

// Components
import { MenuLinks } from "./Links"
import { SearchBar } from "./input/Search_Input"
import { LoginButton } from "@/components/globalComponents/navbar/loginButton/loginButton"

// Icons
import { FaHome, FaUsers, FaMapMarkerAlt, FaClock, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FaCog } from "react-icons/fa"

// Contexts
import { useAuthContext } from "../../../../../context/useAuthContext"

export function Middle_Icons() {

    const { user } = useAuthContext()

    return (
        <aside className="grow mt-4 flex flex-col justify-between">

            {/* SideMenu buttons */}
            <main>
                {user && <div className="flex flex-col md:hidden items-center text-center m-auto py-4 space-x-3">
                    <img
                        src={user?.photoURL ? `${user.photoURL}` : '/placeholder.png'}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover m-auto mb-2"
                    />
                    <div className="text-right block">
                        <p className={`text-md font-medium text-gray-900 capitalize`}>
                            {user?.displayName}
                        </p>
                        {/* <p className="text-xs text-gray-500">Admin</p> */}
                    </div>
                </div>}
                <SearchBar />
                <ul className="scrollStyle relative w-full max-h-100 py-4 flex flex-col justify-between items-center gap-y-5 mt-2 sidebar overflow-y-auto">
                    <MenuLinks href="/" icon={FaHome} innerText="Página inicial" />
                    {user && (
                        <>
                            <MenuLinks href="/favorites" icon={FaHeart} innerText="Favoritos" />
                            <MenuLinks href="/myshop" icon={FaShoppingCart} innerText="Minhas Compras" />
                            <MenuLinks href="/about" icon={FaClock} innerText="Pedidos" />
                            {/* <MenuLinks href="/about" icon={FaClock} innerText="Horários" /> */}
                        </>
                    )}
                    <MenuLinks href="/about" icon={FaUsers} innerText="Sobre nós" />
                    <MenuLinks href="/about" icon={FaMapMarkerAlt} innerText="Área de entrega" />
                    <MenuLinks href="/about" icon={FaClock} innerText="Horários" />
                </ul>
            </main>

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
        </aside>

    )
}