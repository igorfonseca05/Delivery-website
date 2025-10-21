"use client";

import { useEffect, useState } from "react";

export function CardCloseOpen() {
  const [status, setStatus] = useState(() => JSON.parse(localStorage.getItem('status') || '').status);
 
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`

  useEffect(() => {
   localStorage.setItem('status', JSON.stringify({status, time}))
    window.dispatchEvent(new Event('statusChange'))
  }, [status])
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Status do Estabelecimento
      </h3>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold ml-2 text-gray-500 ${!status && 'text-red-500'}`}>Fechado</span>

        {/* Toggle Switch (Simulação pura) */}
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            {/* Note que o input é essencial para o estado, mesmo que `sr-only` (screen-reader only) */}
            <input
              type="checkbox"
              id="toggle"
              className="sr-only"
              defaultChecked
            />
            {/* Linha/Trilha do switch (Cor "ligada" padrão) */}
            <div onClick={() => setStatus(!status)} className={`block w-10 h-5 rounded-full  ${status ?'bg-green-500' : 'bg-red-500'}`}></div>
            {/* Círculo/Botão do switch (Posição "ligada" padrão) */}
            <div onClick={() => setStatus(!status)} className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition ease-in-out transform ${status? 'translate-x-5 ': 'translate-x-0 '}`}></div>
          </div>
        </label>
        <span className={`text-sm font-semibold ml-2 text-gray-500 ${status && 'text-green-500'}`}>
          Aberto
        </span>
      </div>
    </div>
  );
}
