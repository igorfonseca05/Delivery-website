// components/ComboCard.tsx
import Image from "next/image";

interface ComboCardProps {
    id: string
    title: string;
    description: string;
    imageUrl: string;
    price: number | undefined;
    serves?: string;
}

export default function ComboCard({
    id,
    title,
    description,
    imageUrl,
    price,
}: ComboCardProps) {
    return (
        <div className="flex flex-col justify-between border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 max-w-md h-full">
            <div className="flex flex-row justify-between gap-4">
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">{title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2" title={description}>
                        {description}
                    </p>
                    {/* <p className="text-sm font-semibold mt-2">🍽 Serve {serves}</p> */}
                </div>

                <div className="relative w-24 h-24 self-end shrink-0">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <p className="mt-4 text-sm text-gray-800 font-medium">
                A partir de <span className="font-bold">R$ {price}</span>
            </p>
        </div>
    );
}
