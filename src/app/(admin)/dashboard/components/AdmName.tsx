'use client'

import { useAuthContext } from "../../../../../context/useAuthContext";

export function AdmName() {
    
    const {user} = useAuthContext()

  return (
    <p className="text-lg text-gray-700">
      Olá, <span className="font-bold text-red-600">{user?.displayName}</span> Bem-vindo de
      volta.
    </p>
  );
}
