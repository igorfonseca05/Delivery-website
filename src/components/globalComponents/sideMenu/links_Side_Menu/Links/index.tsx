"use client"
import { IconType } from "react-icons"
import Link from "next/link"
import { Icon } from "next/dist/lib/metadata/types/metadata-types"

interface LinkProps {
    href: string,
    innerText: string,
    icon?: IconType
}

import { SearchBar } from "../input/Search_Input"

import { useMenuContext } from "../../../../../../context/MenuContext"
import { useEffect, useState } from "react"

export function MenuLinks({ href, innerText, icon: Icon }: LinkProps) {

    const [select, setSelected] = useState('Página inicial')
    const { setIsOpen } = useMenuContext()
    const [isSelect, setIsSelect] = useState(false)


    function handleMenuLink(innerText: string) {
        setIsOpen(false)
        setSelected(innerText)
    }

    useEffect(() => {
        setIsSelect(select === innerText)
    }, [select])


    return (
        <>

            <li onClick={() => handleMenuLink(innerText)} className={`group/lihover sidemenu-item ${isSelect ? "activeButton" : ''}`}>
                <Link href={`${href}`} className="sidemenu-link">
                    {Icon && <Icon className="min-w-5" />}
                    <p className="sidemenu-innerText">{innerText}</p>
                </Link>
            </li>
        </>
    )
}