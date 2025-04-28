
export function PricesCart() {
    return (
        <>
            <hr className="border-gray-300 h-2 w-full" />
            <div className="flex justify-between w-full">
                <p>Sub-total</p>
                <span>R$ 39.99</span>
            </div>
            <div className="flex justify-between w-full">
                <p>Taxa de entrega</p>
                <span>R$ 40.00</span>
            </div>
            <hr className="border-gray-300 h-2 w-full" />
            <div className="flex justify-between w-full">
                <p className="text-xl">Total</p>
                <span>R$ 40.00</span>
            </div>
        </>
    )
}