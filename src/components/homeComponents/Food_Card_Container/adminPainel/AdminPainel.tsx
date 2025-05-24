import { useState } from "react";

type Order = {
    id: string;
    company: string;
    address: string;
    date: string;
    time: string;
    amount: number;
    status: "Novo" | "Pendente" | "Pago" | "Cancelado";
};

const statusColors = {
    Novo: "bg-orange-100 text-orange-700",
    Pendente: "bg-yellow-100 text-yellow-700",
    Pago: "bg-green-100 text-green-700",
    Cancelado: "bg-red-100 text-red-700",
};

const statusOptions: Order["status"][] = ["Novo", "Pendente", "Pago", "Cancelado"];

export default function OrdersTable() {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "1",
            company: "Igor",
            address: "Rua Moises Gomes de oliveria",
            date: "22/05/2025",
            time: "21:04",
            amount: 120.5,
            status: "Novo",
        },

    ]);

    const updateStatus = (id: string, newStatus: Order["status"]) => {
        setOrders((prev) =>
            prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
        );

        // Aqui você pode chamar sua função para atualizar o status no Firebase
        // ex: updateOrderStatusInFirebase(id, newStatus);
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg shadow-md bg-white p-4">
            <div className="text-xl font-semibold mb-4 text-orange-600">Pedidos Recebidos</div>
            <table className="min-w-full table-auto text-sm">
                <thead>
                    <tr className="bg-orange-50 text-orange-900">
                        <th className="text-left py-2 px-4">Cliente</th>
                        <th className="text-left py-2 px-4">Endereço</th>
                        <th className="text-left py-2 px-4">Data</th>
                        <th className="text-left py-2 px-4">Hora</th>
                        <th className="text-left py-2 px-4">Valor</th>
                        <th className="text-left py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-orange-50">
                            <td className="py-2 px-4">{order.company}</td>
                            <td className="py-2 px-4">{order.address}</td>
                            <td className="py-2 px-4">{order.date}</td>
                            <td className="py-2 px-4">{order.time}</td>
                            <td className="py-2 px-4">R$ {order.amount.toFixed(2)}</td>
                            <td className="py-2 px-4">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(order.id, e.target.value as Order["status"])
                                    }
                                    className={`rounded px-2 py-1 ${statusColors[order.status]} border-none outline-none`}
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
