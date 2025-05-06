"use client"

import { useMenuContext } from "@/context/MenuContext"

import icon from '../../../public/logoIcon.svg'
import { LogoMenu } from "./IconContainer"
import { Middle_Icons } from "./links_Side_Menu"


export function SideMenu() {

    const { isOpen } = useMenuContext()

    return (
        <div className={`group/sidemenu overflow-hidden sidemenu py-3 ${isOpen ? 'isOpen' : 'isClose'} relative`}>
            <div className="flex flex-col w-full grow justify-between">
                <LogoMenu />
                <Middle_Icons />
            </div>
        </div>
    )
}