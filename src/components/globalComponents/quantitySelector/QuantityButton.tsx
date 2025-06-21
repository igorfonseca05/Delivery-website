
import { useQuantityContext } from "../../../../context/quantityContext";

export default function QuantityButton() {

    const { quantity, increase, decrease } = useQuantityContext()

    return (
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 lg:py-2 ">
            <button onClick={decrease} className="text-lg px-2 TextColor hover:text-black">−</button>
            <span className="mx-3  w-4 text-center">{quantity}</span>
            <button onClick={increase} className="text-lg px-2 TextColor hover:text-black">+</button>
        </div>
    );
};