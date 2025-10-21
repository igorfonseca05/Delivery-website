"use client"

// Recursos next
import { useMenuContext } from "../../../../context/MenuContext"
import { usePathname } from "next/navigation"

import { useAuthContext } from "../../../../context/useAuthContext"

// Components
import { LogoMenu } from "./IconContainer"
import { Middle_Icons } from "./links_Side_Menu/middleLinks"
import UserSidebar from "@/app/(private)/profile/userSidebar/userSideBar"
import { useEffect, useRef } from "react"


export function SideMenu() {
    const { isOpen } = useMenuContext()

    useEffect(() => {
        isOpen && (document.body.style.overflowY = 'hidden')
        !isOpen && (document.body.style.overflowY = 'auto')

    }, [isOpen])

    return (
        <>
            {/* <div className={`fixed inset-0 z-50 sm:hidden bg-black/30 backdrop-blur-xs flex items-center justify-center transition-opacity ease-in-out duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                <div className={`group/sidemenu sidemenu ${isOpen ? 'isOpen' : 'isClose'} relative`}>
                    <div className="flex flex-col w-full grow justify-between">
                        <LogoMenu />
                        <Middle_Icons />
                    </div>
                </div>
            </div> */}

            <div className={`group/sidemenu sidemenu hidden sm:block ${isOpen ? 'isOpen' : 'isClose'} relative`}>
                <div className="flex flex-col w-full grow justify-between">
                    <LogoMenu />
                    <Middle_Icons />
                </div>
            </div>
        </>
    )
}