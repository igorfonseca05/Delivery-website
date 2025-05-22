
import { Info } from "lucide-react";
import { PriceIndicator } from "./priceIndicator";
import { ConfirmButton } from "./confirmButton/ConfirmButton";


export default function OrderSummary() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl space-y-6">
            <h2 className="text-xl font-semibold">Resumo do Pedido</h2>

            <div className="space-y-2 text-sm text-gray-600">
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
                <p className="text-xs text-gray-500">(Impostos inclusos)</p>
            </div>
            <ConfirmButton />
        </div>
    );
}
