import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface OrderStatusCardProps {
    orderId: string;
    status: "pendente" | "processando" | "pago" | "cancelado";
    createdAt: string;
    updatedAt: string;
    progress: number;
    itemsCount: number;
    total: number;
}

const statusLabels = {
    pendente: { label: "Pendente", icon: <Clock className="w-4 h-4" />, color: "bg-yellow-400" },
    processando: { label: "Processando", icon: <Clock className="w-4 h-4" />, color: "bg-blue-500" },
    pago: { label: "Pago", icon: <CheckCircle className="w-4 h-4" />, color: "bg-green-500" },
    cancelado: { label: "Cancelado", icon: <XCircle className="w-4 h-4" />, color: "bg-red-500" },
};

export default function OrderStatusCard({
    orderId,
    status,
    createdAt,
    updatedAt,
    progress,
    itemsCount,
    total,
}: OrderStatusCardProps) {
    return (
        <Card className="w-full max-w-3xl mx-auto mb-6 p-4 shadow-md rounded-2xl">
            <CardContent>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Pedido #{orderId}</h2>
                        <p className="text-sm text-muted-foreground">
                            Criado em: {createdAt} | Última atualização: {updatedAt}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge className={`${statusLabels[status].color} text-white px-2 py-1 text-xs rounded-full flex items-center gap-1`}>
                            {statusLabels[status].icon}
                            {statusLabels[status].label}
                        </Badge>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-sm">Itens: {itemsCount}</p>
                    <p className="text-sm font-medium">Total: R$ {total.toFixed(2)}</p>
                </div>

                <div>
                    <Progress value={progress} className="h-2 bg-gray-200" />
                    <p className="text-xs text-muted-foreground mt-1">Progresso do pedido: {progress}%</p>
                </div>
            </CardContent>
        </Card>
    );
}
