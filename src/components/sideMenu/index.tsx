"use client"

import { useMenuContext } from "@/context/MenuContext"

import icon from '../../../public/logoIcon.svg'
import { LogoMenu } from "./logoMenu"
import { Middle_Icons } from "./middle_Icons"
import { End_Icons } from "./end_Icons"


export function SideMenu() {

    const { isOpen } = useMenuContext()

    return (
        <div className={`group/sidemenu overflow-hidden sidemenu py-3 ${isOpen ? 'isOpen' : 'isClose'} relative`}>
            <div className="flex flex-col w-full gap-y-5">
                <LogoMenu />
                <Middle_Icons />
            </div>
            <End_Icons />
        </div>
    )
}