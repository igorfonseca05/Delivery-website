'use client'

// Recursos internos next
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../hooks/useAuth";
import { useAuthContext } from "../../../../../context/useAuthContext";


import { useRouter } from "next/compat/router";

export default function SignUp_Form() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useAuthContext()
    const { createUser, loading, error } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router?.push('/')
        }
    }, [user])

    const handleSignUpForm = async (e: FormEvent) => {
        e.preventDefault()
        
        const user = { name, email, password }
        createUser(user)
    }


    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    return (
        <form className="space-y-4 w-full lg:w-[80%]" onSubmit={handleSignUpForm}>
            <input
                type="text"
                placeholder="Nome"
                className="input"
                required
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="E-mail"
                className="input"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                className="input"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading} className={`button_primary_large w-full  ${loading && 'cursor-not-allowed'}`}>
                {loading ? ' Aguarde' : ' Criar cadastro'}
            </button>

            {/* Botão Google */}
            <p className="text-sm text-gray-500 text-center hover:text-gray-800">
                <Link href={'/login'}>Já possui uma conta?</Link>
            </p>
        </form>
    );
};