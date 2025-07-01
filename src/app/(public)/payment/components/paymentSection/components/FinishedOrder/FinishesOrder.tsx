

export function FinishedOrder({ orderId }: { orderId: string }) {
    return (
        <div className="p-6 text-center space-y-4">
            <h1 className="text-xl font-bold text-green-600">Pedido realizado com sucesso!</h1>
            <h2 className="text-lg text-gray-700">Anote o ID do seu pedido:</h2>
            <div className="bg-gray-100 p-4 rounded-md inline-block text-xl font-mono text-gray-900 border border-gray-300">
                {orderId}
            </div>
            <p className="text-gray-600 max-w-md mx-auto">
                Guarde este código. Ele será necessário para acompanhar ou consultar o status do seu pedido.
            </p>
            <p className="text-gray-700">
                Para mais informações, entre em contato pelo número:{" "}
                <span className="font-semibold">(12) 99621-4388</span>
            </p>
        </div>
    )
}