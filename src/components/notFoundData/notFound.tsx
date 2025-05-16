
import Image from "next/image"

export function NotFoundData({ text }: { text: string }) {
    return (
        <div className="basicStyle min-h-130 flex justify-center items-center flex-col">
            <Image src={'/logoIcon.svg'} alt='Logo paraiso' width={100} height={100} className=" mb-2 opacity-30" />
            <h1 className="text-2xl">{text}</h1>
        </div>
    )
}