
import { MenuLinks } from "../Links"

import { FaHome, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

import { SearchBar } from "../input"

export function Middle_Icons() {
    return (
        <ul className="relative w-full flex flex-col justify-between items-center gap-y-5 mt-2">
            <SearchBar />
            <MenuLinks href="/" icon={FaHome} innerText="Página inicial" />
            <MenuLinks href="/about" icon={FaUsers} innerText="Sobre nós" />
            <MenuLinks href="/about" icon={FaMapMarkerAlt} innerText="Área de entrega" />
            <MenuLinks href="/about" icon={FaClock} innerText="Horários" />
        </ul>
    )
}