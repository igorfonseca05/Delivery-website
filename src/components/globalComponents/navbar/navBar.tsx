'use client'

// Recursos Next
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
// import { useSession, signIn, signOut } from 'next-auth/react'
import { useAuthContext } from '../../../../context/useAuthContext'

// Components
import { useMenuContext } from '../../../../context/MenuContext'
import { useCartContext } from '../../../../context/cartContext'
import { LoginButton } from './loginButton/loginButton'
import UserDropdown from './useDropDown/userDropdown'
import { SignUpButton } from './signUpButton/signUpButton'

// Icons
import { MdSearch, MdMenu, MdClose, MdShoppingCart } from 'react-icons/md'


export function Navbar() {
    const { setIsOpen, isOpen } = useMenuContext()
    const { cartIsOpen, setCartIsOpen } = useCartContext()
    const { user } = useAuthContext()
    const path = usePathname()

    const [searchBarIsOpen, setSearchBarIsOpen] = useState<boolean>(false)

    return (
        <div className={`${path === '/login' || path === '/signup' ? 'hidden' : ''}`}>
            <header className={`navContainer bg-white w-full z-2`}>
                {/* Menu */}
                <nav className='w-full m-auto max-w-300 alignAllContent px-3 md:px-2'>
                    {/* container dos items do menu */}
                    <ul className='flex justify-between items-center'>

                        {/* Menu icon to close menu(Mobile) */}
                        <li className='flex items-center sm:block lg:hidden'>
                            <span><MdMenu className='text-xl text-gray-500 cursor-pointer lg:hidden' onClick={() => setIsOpen(!isOpen)} /></span>
                        </li>

                        <li className='hidden lg:block'>
                            <p>Aberto</p>
                        </li>

                        {/* logo Mobile */}
                        <li className='md:hidden relative w-20 h-10 lg:opacity-0'>
                            <Image
                                src='/logoIcon.svg'
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
                                className={`pl-9 p-1 rounded-lg w-1 bg-gray-100 md:w-[40vw] ${searchBarIsOpen && 'bg-gray-100 w-50'} transition-all ease-in-out duration-500`}
                            />
                        </li>

                        {/* Buttons */}
                        <div className="flex gap-x-3 items-center">
                            {!user && <>
                                <li className='hidden md:flex items-center'>
                                    <SignUpButton />
                                </li>
                                <li className='hidden md:flex items-center'>
                                    <LoginButton innerText='Entrar' style={'button_neutral_medium'} />
                                </li>
                            </>}
                            {user && <UserDropdown />}

                            {/* Shopping Cart */}
                            <li className='cursor-pointer button_neutral_medium p-2 ml-2' onClick={() => setCartIsOpen(!cartIsOpen)}>
                                <MdShoppingCart className='text-gray-700 text-xl' />
                            </li>
                        </div>
                    </ul>
                </nav >
            </header >
        </div>

    )
}