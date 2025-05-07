'use client'

import { MdSearch, MdMenu, MdClose, MdShoppingCart } from 'react-icons/md'
import { FaInstagram, FaShoppingCart, FaGoogle } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import logo from '../../../public/logo.svg'
import logoIcon from '../../../public/logoIcon.svg'

import { useMenuContext } from '@/context/MenuContext'
import { useCartContext } from '@/context/cartContext'

import { usePathname } from 'next/navigation'

import { useSession, signIn, signOut } from 'next-auth/react'
import { LoginButton } from './loginButton/loginButton'
import UserDropdown from './useDropDown/userDropdown'


export function Navbar() {

    const { setIsOpen, isOpen } = useMenuContext()
    const { cartIsOpen, setCartIsOpen } = useCartContext()

    const [searchBarIsOpen, setSearchBarIsOpen] = useState<boolean>(false)
    const [position, setPositon] = useState<GeolocationPosition>()

    const { data: session } = useSession()


    return (
        <div>
            <header className={`navContainer bg-white w-full z-2`}>
                <nav className='w-full m-auto max-w-300 alignAllContent px-3 md:px-2'>
                    <ul className='flex justify-between items-center'>
                        {/* Menu icon to close menu */}
                        <li className='flex items-center sm:block lg:hidden'>
                            <span><MdMenu className='text-xl text-gray-500 cursor-pointer lg:hidden' onClick={() => setIsOpen(!isOpen)} /></span>
                        </li>

                        <li className='hidden lg:block'>
                            <p>Aberto</p>
                        </li>

                        {/* logo Mobile */}
                        <li className='md:hidden relative w-20 h-10 lg:opacity-0'>
                            <Image
                                src={logoIcon}
                                alt='logo'
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </li>

                        {/* Search input */}
                        <li className='hidden md:flex relative max-w-100'>
                            <span
                                className='absolute top-1 left-0.2 px-2 block'
                                onClick={() => setSearchBarIsOpen(!searchBarIsOpen)}>
                                <MdSearch className='text-2xl text-gray-500' />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar prato"
                                className={`pl-9 p-1 rounded-4xl w-1 bg-gray-100 md:w-[40vw] ${searchBarIsOpen && 'bg-gray-100 w-50'} transition-all ease-in-out duration-500`}
                            />
                        </li>

                        {/* Buttons */}
                        <div className="flex gap-x-8 items-center">
                            {!session && (
                                <li className='hidden md:flex items-center order-2'>
                                    <LoginButton innerText='Entrar' style={'shadow-sm w-30 text-center hover:bg-[#ffab2e] hover:text-white p-2 rounded-lg bg-[#ffb443]'} />
                                </li>)
                            }
                            <UserDropdown />
                            <li className='cursor-pointer neutralButton' onClick={() => setCartIsOpen(!cartIsOpen)}>
                                <MdShoppingCart className='text-gray-700 text-xl' />
                            </li>
                        </div>
                    </ul>

                </nav >
            </header >
        </div>

    )
}