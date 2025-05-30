'use client'
import React from "react";

import { SearchParams } from "next/dist/server/request/search-params";
import { usePathname } from "next/navigation";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const path = usePathname()

    return (
        <footer className={`bg-white p-2 text-gray-600 py-4 max-w-full mt-3 ${path === '/login' || path === '/signup' ? 'hidden' : ''}`}>
            <div className=" flex flex-wrap justify-between sizeContentet alignAllContent text-[clamp(0.6rem,1vw,1rem)]">
                {/* Coluna 1: Endereço */}
                <div>
                    <h4 className="font-semibold mb-2">Endereço</h4>
                    <p>Rua Eroni dos Santos Goulart, 24</p>
                    <p>Jardim Paraíso, Cruzeiro - SP</p>
                    <p>CEP: 12721-295</p>
                </div>

                {/* Coluna 2: Informações */}
                <div>
                    <h4 className="font-semibold my-2">Outras informações</h4>
                    {/* <p>CNPJ: 45.217.680/0001-38</p> */}
                    <p>Site desenvolvido por:</p>
                    <p> Aurélio, Igor, José, Telma e Murilo</p>
                    <p>Projeto: Paraíso da Gastronomia</p>
                </div>

                {/* Coluna 3: Direitos autorais */}
                <div className="md:text-right hidden md:block">
                    <p>&copy; {currentYear} Paraíso da Gastronomia</p>
                </div>
            </div>
        </footer>
    );
};

