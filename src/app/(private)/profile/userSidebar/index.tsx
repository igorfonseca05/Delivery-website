// components/UserSidebar.tsx

import Image from "next/image"

type UserSidebarProps = {
    name: string
    email: string
    url: string
}

export default function UserSidebar({ name, email, url }: UserSidebarProps) {
    return (
        <aside className="bg-white shadow rounded-lg p-4 w-full max-w-xs">
            <div className="flex flex-col items-center">
                <div className="w-full rounded-lg h-70 overflow-hidden shadow-md mb-4">
                    <img
                        src={"/linkedin.jpeg"}
                        alt="Avatar"
                        className="object-cover"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-lg font-semibold capitalize">{name}</h2>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
                <a
                    href="#"
                    className="mt-4 inline-block text-blue-600 text-sm font-medium hover:underline transition"
                >
                    Ver Perfil Público
                </a>
            </div>
        </aside>
    )
}
