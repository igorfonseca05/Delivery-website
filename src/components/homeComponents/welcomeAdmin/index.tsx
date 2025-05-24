
import { useEffect, useState } from "react";

export default function WelcomePanel() {
    const [date, setDate] = useState("");

    useEffect(() => {
        const now = new Date();
        const formatted = now.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setDate(formatted);
    }, []);

    return (
        <div className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-2xl p-6 shadow-md mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">Bem-vindo de volta, Leandro!</h1>
                    <p className="text-sm md:text-base text-orange-100">{date}</p>
                </div>
                <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl text-sm text-orange-100">
                    Área administrativa do painel de pedidos
                </div>
            </div>
        </div>
    );
}
