// Este é componente container do SideMenu

// Components
import { MenuLinks } from "./Links"
import { SearchBar } from "./input/Search_Input"
import { LoginButton } from "@/components/globalComponents/navbar/loginButton/loginButton"

// Icons

import {
    Home,
    Users,
    MapPin,
    Clock,
    Heart,
    ShoppingCart,
    Settings,
} from 'lucide-react';


// Contexts
import { useAuthContext } from "../../../../../context/useAuthContext"
import { useState } from "react"

export function Middle_Icons() {

    const { user } = useAuthContext()

    const [selected, useSelected] = useState('Página inicial')
    // const [isSelected, setIsSelected] = useState(false)
    let isSelected = false

    const linksButton = [
        { href: '/', icon: Home, text: 'Página inicial' },
        ...(user ?
            [
                { href: '/favorites', icon: Heart, text: 'Favoritos' },
                { href: '/myshop', icon: ShoppingCart, text: 'Minhas Compras' },
                { href: '/about', icon: Clock, text: 'Pedidos' },
            ]
            : []),
        { href: '/about', icon: Users, text: 'Sobre nós' },
        { href: '/deliveryArea', icon: MapPin, text: 'Área de entrega' },
        { href: '/about', icon: Clock, text: 'Horários' },
    ]

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
                    {linksButton.map((item, index) => {
                        isSelected = item.text === selected
                        return (
                            <MenuLinks
                                key={index}
                                href={item.href}
                                icon={item.icon}
                                innerText={item.text}
                                isSelected={isSelected}
                                useSelected={useSelected}
                            />
                        )
                    })}
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
                <MenuLinks href="/config" icon={Settings} isSelected={isSelected} useSelected={useSelected} innerText="Configurações" />
            </ul>
        </aside>

    )
}