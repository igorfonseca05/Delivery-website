
import Image from "next/image";

export default function ImageEmptyCart() {
    return (
        <div className="m-auto text-center">
            <Image src={`/empty.svg`} alt="logo carrinho vazio" priority quality={50} width={200} height={200} className="opacity-40 mb-4" />
            <p>Seu carrinho está vazio</p>
            <span className="text-sm text-gray-500">Adicione itens</span>
        </div>
    );
};