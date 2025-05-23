// components/UserSidebar.tsx

import Image from "next/image"

type UserSidebarProps = {
    name: string
    email: string
    url: string
}

export default function UserSidebar({ name, email, url }: UserSidebarProps) {
    return (
        <aside className="bg-white shadow rounded-lg p-4 w-full md:max-w-xs">
            <div className="flex flex-col items-center">
                <div className="w-34 rounded-full h-34 overflow-hidden mb-4">
                    <img
                        src={'/placeholder.png'}
                        alt="Avatar"
                        className="object-cover rounded-full"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-lg font-semibold capitalize">{name}</h2>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
                <div className="flex-col justify-between  w-full hidden md:flex">
                    {/* <div className="mt-2 w-full rounded-lg bg-gray-100">
                        <p>meus Items</p>
                    </div>
                    <div className="mt-2 w-full rounded-lg bg-gray-100">
                        <p>meus Items</p>
                    </div> */}
                    {/* <div className="mt-2 w-full grow rounded-lg bg-gray-100">
                        <p>meus itens</p>
                    </div> */}
                    <div className="mt-2 w-full rounded-lg bg-gray-100 text-center">
                        <p className="text-red-500">Remover conta</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
