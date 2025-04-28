
import { IconType } from "react-icons"
import Link from "next/link"
import { Icon } from "next/dist/lib/metadata/types/metadata-types"

interface LinkProps {
    href: string,
    innerText: string,
    icon?: IconType
}

import { SearchBar } from "../input"

export function MenuLinks({ href, innerText, icon: Icon }: LinkProps) {
    return (
        <li className="group/lihover sidemenu-item">
            <Link href={`${href}`} className="sidemenu-link">
                {Icon && <Icon className="min-w-5" />}
                <p className="sidemenu-innerText">{innerText}</p>
            </Link>
        </li>
    )
}