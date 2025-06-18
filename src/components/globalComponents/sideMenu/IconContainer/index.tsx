"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuthContext } from "../../../../../context/useAuthContext"

import { Menu } from "lucide-react"

import { useMenuContext } from "../../../../../context/MenuContext"

export function LogoMenu() {

    const { isOpen, setIsOpen } = useMenuContext()

    const { user } = useAuthContext()


    return (
        <div className={`mt-1.5 grow-0 mx-auto flex flex-col w-full`}>
            <span className="flex mt-3 ml-3 justify-between">
                <Menu className='text-xl text-gray-500 cursor-pointer lg:hidden'
                    onClick={() => setIsOpen(!isOpen)} />

                <div className="flex md:hidden justify-end m-auto grow mr-3">
                    <Link href="/profile" className="flex">
                        <img
                            src={user?.photoURL ? `${user.photoURL}` : '/placeholder.png'}
                            alt="Avatar"
                            className="w-8 h-8 rounded-full object-cover m-auto order-5"
                        />
                    </Link>
                </div>
            </span>
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