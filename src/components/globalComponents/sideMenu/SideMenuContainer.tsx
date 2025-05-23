"use client"

// Recursos next
import { useMenuContext } from "../../../../context/MenuContext"
import { usePathname } from "next/navigation"

import { useAuthContext } from "../../../../context/useAuthContext"

// Components
import { LogoMenu } from "./IconContainer"
import { Middle_Icons } from "./links_Side_Menu/middleLinks"
import UserSidebar from "@/app/(private)/profile/userSidebar/userSideBar"


export function SideMenu() {
    const { isOpen } = useMenuContext()

    return (
        <div>
            <div className={`group/sidemenu sidemenu py-3 ${isOpen ? 'isOpen' : 'isClose'} relative`}>
                <div className="flex flex-col w-full grow justify-between">
                    <LogoMenu />
                    <Middle_Icons />
                </div>
            </div>
        </div>
    )
}