
import { IconType } from "react-icons"
import Link from "next/link"
import { Icon } from "next/dist/lib/metadata/types/metadata-types"

interface LinkProps {
    href: string,
    innerText: string,
    icon?: IconType
}

import { SearchBar } from "../input"

import { useMenuContext } from "@/context/MenuContext"

export function MenuLinks({ href, innerText, icon: Icon }: LinkProps) {

    const { setIsOpen } = useMenuContext()

    return (
        <li onClick={() => setIsOpen(false)} className="group/lihover sidemenu-item">
            <Link href={`${href}`} className="sidemenu-link">
                {Icon && <Icon className="min-w-5" />}
                <p className="sidemenu-innerText">{innerText}</p>
            </Link>
        </li>
    )
}