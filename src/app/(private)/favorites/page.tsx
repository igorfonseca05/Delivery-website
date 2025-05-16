// app/favoritos/page.tsx

'use client';

import { ContentContainer } from '@/components/globalComponents/Container/container';
import { NotFoundData } from '@/components/globalComponents/notFoundData/notFound';
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

type Prato = {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
};

const favoritosMock: Prato[] = [
    // {
    //     id: 1,
    //     nome: 'Parmegiana de Frango',
    //     preco: 22.0,
    //     imagem: '/imagens/parmegiana-frango.jpg',
    // },
    // {
    //     id: 2,
    //     nome: 'Guaraná Cibal 2L',
    //     preco: 10.0,
    //     imagem: '/imagens/guarana.jpg',
    // },
    // {
    //     id: 3,
    //     nome: 'Bife à Milanesa',
    //     preco: 18.0,
    //     imagem: '/imagens/bife-milanesa.jpg',
    // },
];

export default function FavoritosPage() {
    const [favoritos] = useState<Prato[]>(favoritosMock);

    return (
        <ContentContainer>
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {/* <FaHeart className="text-red-500" /> */}
                Meus Favoritos
            </h1>
            {favoritos.length === 0 ? (
                <div>
                    <NotFoundData text='Você ainda não adicionou nenhum favorito.' />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favoritos.map((prato) => (
                        <div
                            key={prato.id}
                            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                        >
                            <Image
                                src={prato.imagem}
                                alt={prato.nome}
                                width={200}
                                height={150}
                                className="rounded-md object-cover"
                            />
                            <h2 className="mt-2 text-center font-semibold">{prato.nome}</h2>
                            <p className="text-orange-500 font-bold mt-1">R$ {prato.preco.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </ContentContainer>
    );
}
