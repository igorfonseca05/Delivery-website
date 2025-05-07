
import { FaSignInAlt } from "react-icons/fa"
import Link from "next/link"

export function LoginButton({ style, innerText }: { style: string, innerText: string }) {
    return (
        <Link href='/login' className={`${style}`}>
            <FaSignInAlt className="min-w-5 md:hidden" />
            <p>{innerText}</p>
            {/* <FcGoogle size={24} /> */}
        </Link>
    )
}