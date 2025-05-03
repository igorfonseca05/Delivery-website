import Image from "next/image"

export function GifLoading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-50 basicStyle">
            <Image src='/fundo.gif' width={200} height={200} quality={100} alt="gif" />
            <span>Carregando itens, aguarde!...</span>
        </div>
    )
}