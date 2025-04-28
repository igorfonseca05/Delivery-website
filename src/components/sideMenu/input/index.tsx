
import { MdSearch } from "react-icons/md"

export function SearchBar() {
    return (
        <li className='flex lg:hidden relative'>
            <span
                className='absolute top-1 left-0.2 px-5 block'>
                <MdSearch className='text-2xl text-gray-500' />
            </span>
            <input
                type="text"
                placeholder="Buscar prato"
                className={`pl-9 p-1 rounded-4xl w-[90%] mx-auto bg-gray-100 lg:w-[30vw]`}
            />
        </li>
    )
}