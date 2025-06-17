import { Truck, Store } from "lucide-react"

interface GetOrderProps {
    getOrder?: string
    setGetOrder: (getOrder: string) => void
}

export default function GetOrderContainer({ setGetOrder }: GetOrderProps) {
    return (
        <div className='flex flex-col space-y-2 mb-4'>
            <p className='text-[clamp(1rem,1em,2rem)] font-extrabold mb-4'>Como você gostaria que obter seu pedido?</p>
            <div className="flex flex-col space-x-3 sm:flex-row">
                <button className='button_neutral_large flex gap-x-4 grow' onClick={() => setGetOrder('Entrega')}>
                    <Truck className="w-5 h-5 text-gray-600" />
                    Entrega
                </button>
                <button className='button_neutral_large flex gap-x-4 grow' onClick={() => setGetOrder('Loja')}>
                    <Store className="w-5 h-5 text-gray-600" />
                    Retirar na loja
                </button>
            </div>
        </div>
    );
};