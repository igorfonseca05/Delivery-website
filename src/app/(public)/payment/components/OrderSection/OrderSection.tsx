import { upperCaseText } from "../../../../../../utils/helperFunctions";
import { UserData } from "../../../../../../utils/types/types"

interface OrderSectionProps {
    userAddress: UserData
}


export default function OrderSection({ userAddress }: OrderSectionProps) {

    return (
        <div className="rounded-xl bg-white p-4 mb-4 max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Informações do Pedido</h2>

            <div className="mb-3">
                <p className="text-sm text-gray-600">Nome:</p>
                {/* <p className="font-medium">{upperCaseText(userAddress?.nome) + ' ' + userAddress?.sobrenome}</p> */}
            </div>

            <div className="mb-3">
                <p className="text-sm text-gray-600">Opção de entrega</p>
                <p className="text-sm text-gray-600">Endereço de entrega:</p>
                <p className="font-medium">
                    Rua moises gomes de oliveira
                </p>
                <p className="text-sm text-gray-500">
                    150
                </p>
            </div>

            <div>
                <p className="text-sm text-gray-600">Forma de pagamento:</p>
                <p className="font-medium">pix</p>
            </div>
        </div>
    );
};