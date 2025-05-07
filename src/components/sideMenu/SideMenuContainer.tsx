"use client"

import { useMenuContext } from "@/context/MenuContext"

import icon from '../../../public/logoIcon.svg'
import { LogoMenu } from "./IconContainer"
import { Middle_Icons } from "./links_Side_Menu"
import { useSession } from "next-auth/react"

import UserSidebar from "@/app/profile/userSidebar"

export function SideMenu() {

    const { isOpen } = useMenuContext()
    const { data: session } = useSession()

    return (
        <div className={`group/sidemenu overflow-hidden sidemenu py-3 ${isOpen ? 'isOpen' : 'isClose'} relative`}>
            <div className="flex flex-col w-full grow justify-between">
                <LogoMenu />
                {/* <UserSidebar
                    name={`${session?.user?.name}`}
                    email={`${session?.user?.email}`}
                    url={`${session?.user?.image}`}
                /> */}
                <Middle_Icons />
            </div>
        </div>
    )
}