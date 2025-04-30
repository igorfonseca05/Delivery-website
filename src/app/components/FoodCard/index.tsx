import Image from "next/image";

import { MdAddShoppingCart } from "react-icons/md";

interface FoodCardProps {
    name: string;
    price: number;
    imageUrl: string;
}

export default function FoodCard({ name, price, imageUrl }: FoodCardProps) {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm w-50">
            <div className="flex relative aspect-[3/2] justify-center">
                <Image
                    src={`/${imageUrl}`}
                    alt={name}
                    fill
                    className="rounded-lg object-cover"
                />
            </div>
            <h3 className="text-md font-semibold leading-5 break-words mt-2">{name}</h3>
            <p className="text-sm font-bold mt-1 text-orange-500">
                ${price.toFixed(2)}
            </p>
            <button className="buttonStyle w-full flex justify-center mt-2 buttonHover">
                <MdAddShoppingCart />
            </button>
        </div>
    );
}
