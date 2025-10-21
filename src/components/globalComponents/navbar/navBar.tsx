"use client";

// Recursos Next
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { useSession, signIn, signOut } from 'next-auth/react'
import { useAuthContext } from "../../../../context/useAuthContext";

import { useCartContext } from "../../../../context/cartContext";

import { useAdminContext } from "../../../../context/isAdminContext";

// Components
import { useMenuContext } from "../../../../context/MenuContext";
import { useToggleCartContext } from "../../../../context/toggleCartContext";
import { LoginButton } from "./loginButton/loginButton";
import UserDropdown from "./useDropDown/userDropdown";
import { SignUpButton } from "./signUpButton/signUpButton";

// Icons
// import { ShoppingCart } from 'react-icons/md'
import { Search, Menu, X, ShoppingCart } from "lucide-react";

export function Navbar() {
  const { setIsOpen, isOpen } = useMenuContext();
  const { order, total } = useCartContext();
  const { cartIsOpen, setCartIsOpen } = useToggleCartContext();
  const { isAdmin } = useAdminContext();
  const { user } = useAuthContext();
  const path = usePathname();

  const [searchBarIsOpen, setSearchBarIsOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<{status: boolean, time: string}>({status: false, time: ''});
  const [text, setText] = useState("");

  useEffect(() => {
      function getStatus() {
        const storage = JSON.parse(localStorage.getItem("status") || '');
        setStatus(storage)
    }

    window.addEventListener('statusChange', getStatus)

    return () => window.removeEventListener('statusChange', getStatus)
  }, []);


 useEffect(() => {

    const now = new Date()

    const date = new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate() + 1}`)

    if(now.toDateString() === date.toDateString()) {
        setText('hoje')
    } else {
        setText('ontem')
    }

 }, [])


  return (
    <div
      className={`${path === "/login" || path === "/signup" ? "hidden" : ""}`}
    >
      <header className={`navContainer bg-white w-full z-2 shadow`}>
        {/* Menu */}
        <nav className="w-full m-auto sizeContent alignAllContent px-3 md:px-2">
          {/* container dos items do menu */}
          <ul className="flex justify-between items-center">
            {/* Menu icon to close menu(Mobile) */}
            <li className="flex items-center sm:block lg:hidden">
              <span>
                <Menu
                  className="text-xl text-gray-500 cursor-pointer lg:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </span>
            </li>

            <li className={`hidden lg:block min-w-37`}>{`${status.status? `🟢 Abriu ${text}` : `🔴 Fechou ${text}`} as ${status.time}`}</li>

            {/* logo Mobile */}
            <li className="md:hidden relative w-20 h-10 lg:opacity-0">
              <Image
                src="/logoIcon.svg"
                alt="logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </li>

            {/* Search input */}
            {!isAdmin ? (
              <li className="hidden md:flex relative max-w-100">
                <span
                  className="absolute top-1 left-0.2 px-2 block"
                  onClick={() => setSearchBarIsOpen(!searchBarIsOpen)}
                >
                  <Search className="text-2xl text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Buscar prato"
                  className={`pl-9 p-1 rounded-lg w-1 bg-gray-100 md:w-[40vw] ${
                    searchBarIsOpen && "bg-gray-100 w-50"
                  } transition-all ease-in-out duration-500`}
                />
              </li>
            ) : (
              <p>Logo</p>
            )}

            {/* Buttons */}
            <div className="flex gap-x-3 items-center">
              {!user && (
                <>
                  <li className="hidden md:flex items-center">
                    <SignUpButton />
                  </li>
                  <li className="hidden md:flex items-center">
                    <LoginButton
                      innerText="Entrar"
                      style={"button_neutral_medium"}
                    />
                  </li>
                </>
              )}
              {user && <UserDropdown />}

              {/* Shopping Cart */}

              {!isAdmin && (
                <li
                  className={`cursor-pointer flex sm:p-2 sm:ml-2 ${
                    path === "/payment" && "opacity-50 pointer-events-none"
                  }`}
                  onClick={() => setCartIsOpen(!cartIsOpen)}
                >
                  <div className="flex items-baseline gap-x-0.5 relative py-1">
                    <span
                      className={`absolute top-0 left-4 w-4 h-4 text-center bg-[#df4f4b] text-white rounded-full text-[11px] ${
                        order.cartItens.length === 0 ? "hidden" : "block"
                      }`}
                    >
                      {order.cartItens.length}
                    </span>
                    <ShoppingCart className="text-gray-700 text-2xl" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 hidden">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </header>
    </div>
  );
}
