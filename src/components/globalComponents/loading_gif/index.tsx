import Image from "next/image"

export function GifLoading() {
    return (
        <div className="flex flex-col justify-center items-center h-130 basicStyle">
            <Image src='/gif.gif' width={150} height={150} quality={100} priority alt="gif" />
            <span>Carregando itens, aguarde!...</span>
        </div>
    )
}