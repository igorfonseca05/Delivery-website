// Este é componente container do SideMenu

import { useMenuContext } from "../../../../../context/MenuContext";
import { useAuth } from "../../../../../hooks/useAuth";

// Components
import { MenuLinks } from "./Links"
import { SearchBar } from "./input/Search_Input"
import { LoginButton } from "@/components/globalComponents/navbar/loginButton/loginButton"
import Link from "next/link";

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
import { useEffect, useState } from "react"
import { useRef } from "react";

export function Middle_Icons() {

    const { user } = useAuthContext()
    const { isOpen, setIsOpen } = useMenuContext()
    const { logout } = useAuth()

    const scroll = useRef<HTMLUListElement>(null)

    const [selected, useSelected] = useState('Página inicial')

    let isSelected = false

    const linksButton = [
        { href: '/', icon: Home, text: 'Página inicial' },
        ...(user ?
            [
                { href: '/favorites', icon: Heart, text: 'Favoritos' },
                { href: '/myshop', icon: ShoppingCart, text: 'Minhas Compras' },
                { href: '/orders', icon: Clock, text: 'Pedidos' },
            ]
            : []),
        { href: '/about', icon: Users, text: 'Sobre nós' },
        { href: '/promos', icon: Users, text: 'Promoções' },
        { href: '/deliveryArea', icon: MapPin, text: 'Área de entrega' },
        { href: '/about', icon: Clock, text: 'Horários' },
    ]


    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                scroll.current && scroll.current.scrollBy({ top: 50, behavior: 'smooth' });
            }, 300)
            setTimeout(() => {
                scroll.current && scroll.current?.scrollTo({ top: 0, behavior: 'smooth' });
            }, 600)

        }
    }, []);


    return (
        <aside className="grow flex flex-col justify-between pt-4">

            {/* SideMenu buttons */}
            <main>
                <SearchBar />
                <ul ref={scroll} className="scrollStyle relative w-full max-h-100 py-4 flex flex-col justify-between items-center gap-y-5 mt-2 sidebar overflow-y-auto">
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
                {!user && <>
                    <li className="group/lihover sidemenu-item md:hidden" onClick={() => setIsOpen(false)}>
                        <LoginButton style={'sidemenu-link'} innerText="Entrar" />
                    </li>
                    <MenuLinks href="/config" icon={Settings} isSelected={isSelected} useSelected={useSelected} innerText="Configurações" />
                </>}
                {user && <>
                    <li className="group/lihover sidemenu-item md:hidden button_primary_large" onClick={() => {
                        setIsOpen(false)
                        logout()
                    }}>
                        <LoginButton style={'sidemenu-link'} innerText="Sair" />
                    </li>
                    <MenuLinks href="/config" icon={Settings} isSelected={isSelected} useSelected={useSelected} innerText="Configurações" />
                </>}
            </ul>
        </aside>

    )
}