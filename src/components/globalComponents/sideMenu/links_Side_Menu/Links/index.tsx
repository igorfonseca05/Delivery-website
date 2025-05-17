"use client"
import { IconType } from "react-icons"
import Link from "next/link"
import { Icon } from "next/dist/lib/metadata/types/metadata-types"

interface LinkProps {
    href: string,
    innerText: string,
    icon?: IconType,
    isSelected: boolean,
    useSelected: (innerText: string) => void
}

import { SearchBar } from "../input/Search_Input"

import { useMenuContext } from "../../../../../../context/MenuContext"
import { useEffect, useState } from "react"

export function MenuLinks({ href, innerText, icon: Icon, isSelected, useSelected }: LinkProps) {

    const { setIsOpen } = useMenuContext()

    function handleLink(innerText: string) {
        setIsOpen(false)
        useSelected(innerText)
    }

    return (
        <>
            <li onClick={() => handleLink(innerText)} className={`group/lihover sidemenu-item ${isSelected ? "activeButton" : ''}`}>
                <Link href={`${href}`} className="sidemenu-link">
                    {Icon && <Icon className="min-w-5" />}
                    <p className="sidemenu-innerText">{innerText}</p>
                </Link>
            </li>
        </>
    )
}