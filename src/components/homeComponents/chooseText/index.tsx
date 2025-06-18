'use client'

import { useAdminContext } from "../../../../context/isAdminContext";


type SummaryCardProps = {
    title: string;
    value: number;
    color: string;
};

function SummaryCard({ title, value, color }: SummaryCardProps) {

    return (
        <div className={`flex-1 bg-${color}-100 border-l-4 border-${color}-500 rounded p-4 shadow-sm`}>
            <h3 className="text-sm text-gray-600">{title}</h3>
            <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
        </div>
    );
}

export default function OrdersSummary() {

    const { isAdmin } = useAdminContext()

    return (
        <>
            {!isAdmin ? (
                <h1 className="text-[clamp(1.5rem,1em,2rem)] my-3 text-gray-900 font-semibold">Escolha uma categoria</h1>
            ) : (
                <>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                        <SummaryCard title="Pedidos no total" value={1} color="orange" />
                        <SummaryCard title="Entregues" value={0} color="green" />
                        <SummaryCard title="Pendentes" value={1} color="yellow" />
                        <SummaryCard title="Cancelados" value={0} color="red" />
                    </div >
                </>
            )
            }
        </>
    );
}
