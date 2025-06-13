"use client"

import { useAuth } from "../../../../../hooks/useAuth"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FcGoogle } from "react-icons/fc"

export default function Form() {

    const { signIn, error, loading } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Handle login
    async function handleLoginForm(e: React.FormEvent) {
        e.preventDefault()

        const userCredentials = {
            email,
            password
        }
        signIn(userCredentials)
    }

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])


    return (
        <form onSubmit={handleLoginForm} className="flex flex-col gap-y-3">
            <label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="E-mail" className="input" required />
            </label>
            <label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" className="input" required />
            </label>
            <a href="" className="my-2">Esqueceu sua senha?</a>

            {!loading && <button className="button_primary_large">Entrar</button>}
            {loading && <button disabled className="button_primary_large cursor-pointer">Aguarde...</button>}

            <span className="inline-flex items-center">
                <hr className="w-1/2 text-slate-300" />
                <p className="mx-1 text-slate-500">ou</p>
                <hr className="w-1/2 text-slate-300" />
            </span>
            {/* Button de login */}
            <button className='flex items-center justify-center gap-x-3 border-slate-200 border-1 w-full bg-white hover:bg-[#4283f1] text-slate-600 hover:text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200'>
                <p>Entrar com Google</p>
                <FcGoogle size={24} />
            </button>

        </form>
    );
};