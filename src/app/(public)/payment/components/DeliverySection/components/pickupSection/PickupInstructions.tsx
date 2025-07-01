
import { Store, Clock, MapPin } from "lucide-react"

export default function PickupInstructions() {
    return (
        <div className="space-y-4 px-2">
            <div className="flex items-center gap-3">
                {/* <Store className="" /> */}
                <h2 className="text-lg font-semibold">Retirada na Loja</h2>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
                {/* <p>
                    Onde nos encontrar
                </p> */}

                <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5" />
                    <span>
                        <strong>Endereço para retirada:</strong><br />
                        Rua Eroni dos Santos Goulart, 24<br />
                        Jardim Paraíso, Cruzeiro - SP<br />
                        CEP: 12721-295
                    </span>
                </div>

                <div className="flex items-start gap-2 mb-4">
                    <Clock className="w-5 h-5  mt-0.5" />
                    <span>
                        <strong>Horário de retirada:</strong><br />
                        Segunda a Sábado, das 10h às 21h
                    </span>
                </div>
                <p className="font-semibold">
                    Ao chegar, informe o número do seu pedido para agilizar a entrega.
                </p>
            </div>
        </div>
    )
}
