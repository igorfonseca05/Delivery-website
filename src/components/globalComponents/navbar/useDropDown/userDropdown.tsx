"use client";

import { useAuthContext } from "../../../../../context/useAuthContext";
import { useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import Link from "next/link";

import {
    FiUser,
    FiSettings,
    FiLogOut,
    FiChevronDown,
} from "react-icons/fi";



export default function UserDropdown() {
    const { user } = useAuthContext()
    const [open, setOpen] = useState(false);

    const { logout } = useAuth()

    return (
        <div className="relative text-left order-1 hidden md:inline-block">
            {/* Botão principal com avatar, nome e seta */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center"
            >
                <div className="flex items-center space-x-3">
                    <div className="text-right block">
                        <p className={`text-md font-medium text-gray-900 capitalize`}>
                            {user?.displayName}
                        </p>
                        {/* <p className="text-xs text-gray-500">Admin</p> */}
                    </div>
                    <img
                        src={user?.photoURL ? `${user.photoURL}` : '/placeholder.png'}
                        alt="Avatar"
                        className="w-9 h-9 rounded-full object-cover"
                    />
                    <FiChevronDown className="text-gray-500" />
                </div>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white">
                    <div className="py-1">
                        <Link
                            href="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setOpen(!open)}
                        >
                            <FiUser className="mr-2" /> Profile
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setOpen(!open)}
                        >
                            <FiSettings className="mr-2" /> Settings
                        </Link>

                        {/* logout Button */}
                        <button
                            onClick={() => logout()}
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            <FiLogOut className="mr-2" /> Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
