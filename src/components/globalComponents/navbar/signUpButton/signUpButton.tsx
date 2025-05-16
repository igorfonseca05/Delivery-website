import { FaUserPlus } from "react-icons/fa"
import Link from "next/link"

export function SignUpButton() {
    return (
        <Link href='/signup' className={`button_primary_medium`}>
            <FaUserPlus className="min-w-5 md:hidden" />
            <p>Cadastrar</p>
            {/* <FcGoogle size={24} /> */}
        </Link>
    )
}