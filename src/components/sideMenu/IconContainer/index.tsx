"use client"

import Image from "next/image"

import { MdMenu } from "react-icons/md"

import { useMenuContext } from "@/context/MenuContext"

export function LogoMenu() {

    const { isOpen, setIsOpen } = useMenuContext()


    return (
        <div className={`mt-1.5 grow-0 mx-auto flex flex-col w-full`}>
            <span><MdMenu className='text-xl text-gray-500 cursor-pointer lg:hidden mx-4' onClick={() => setIsOpen(!isOpen)} /></span>
            <Image
                src='logoIcon.svg'
                alt='logo'
                priority
                width={50}
                height={50}
                className="hidden h-10 md:block size-10 m-auto group-hover/sidemenu:hidden"
            />
            <Image
                src='logo.svg'
                alt='logo'
                priority
                width={50}
                height={50}
                className="hidden size-25 h-10 mx-auto md:group-hover/sidemenu:block"
            />
        </div>
    )
}