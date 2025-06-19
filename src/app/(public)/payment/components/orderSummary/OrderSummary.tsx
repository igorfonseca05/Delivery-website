"use client"

import { Info } from "lucide-react";
import { PriceIndicator } from "./priceIndicator/priceIndicator";
import { ConfirmButton } from "./confirmButton/ConfirmButton";

import { useCartContext } from "../../../../../../context/cartContext";
import { CardItem } from "@/components/globalComponents/navbar/CartSidebar/CardItem/card_SideBar";


export default function OrderSummary({ removeButton }: { removeButton?: boolean }) {

    const { cartItensArray } = useCartContext()

    return (
        <div className="mx-auto p-4 md:p-6 bg-white rounded-lg space-y-6 h-full overflow-hidden">
            <h2 className="text-[clamp(1.5rem,1em,2rem)] text-center font-semibold">Resumo do Pedido</h2>
            <div className="flex flex-col flex-1 justify-between h-[90%]">
                <div className="flex flex-col gap-y-2 overflow-auto">
                    {cartItensArray && cartItensArray?.map(({ _id, name, price, imageUrl, quantity }) => (
                        <CardItem
                            key={_id}
                            id={_id}
                            name={name}
                            price={price}
                            imageUrl={imageUrl}
                            quantity={quantity} />
                    ))}
                </div>
                <div className="space-y-2 text-sm text-gray-60">
                    <div className="flex justify-between">
                        <span>Valor dos itens:</span>
                        <PriceIndicator style="font-medium text-gray-800" type="totalCartItens" />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <span>Taxa de entrega:</span>
                            <Info size={14} className="text-gray-400" />
                        </div>
                        <PriceIndicator type="deliveryFee" style="font-medium text-gray-800" />
                    </div>

                    <hr />

                    <div className="flex justify-between text-base font-semibold text-gray-900">
                        <span>Total:</span>
                        <PriceIndicator type="total" />
                    </div>
                    {!removeButton && <p className="text-xs text-gray-500">(Impostos inclusos)</p>}
                </div>

            </div>
            {/* {!removeButton && <ConfirmButton />} */}
        </div>
    );
}
