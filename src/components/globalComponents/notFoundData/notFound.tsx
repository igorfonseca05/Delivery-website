
import Image from "next/image"

export function NotFoundData({ text, description }: { text: string, description?: string }) {
    return (
        <div className="basicStyle flex justify-center items-center flex-col">
            <Image src={'/logoIcon.svg'} alt='Logo paraiso' width={80} height={80} className=" mb-2 opacity-80" />
            <h1 className="text-[clamp(1.4rem,1rem,2rem)] text-gray-900 font-bold max-w-[70%] text-center">{text}</h1>
            <p className="text-[clamp(1rem,0.8rem,2rem)] mt-2 max-w-[70%] text-center">{description}</p>
        </div>
    )
}