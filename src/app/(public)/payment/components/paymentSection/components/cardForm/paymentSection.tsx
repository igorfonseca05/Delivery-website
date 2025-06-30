
import { Lock, CreditCard } from "lucide-react";
import { motion } from 'framer-motion';

export default function CardForm() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form className=" w-full mx-auto space-y-6">
                <div>
                    <h2 className="text-lg font-semibold">Informações do cartão</h2>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Nome no cartão
                    </label>
                    <input
                        type="text"
                        placeholder="Marcelo Santos"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Número do cartão
                    </label>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                        {/* Cartão de crédito logo */}
                        <CreditCard className="text-black/30" />
                        <input
                            type="text"
                            placeholder="Nº cartão"
                            className="flex-1 pl-2 text-sm bg-transparent  outline-none"
                        />
                        {/* Cadeado */}
                        {/* <Lock size={20} className="text-black/30" /> */}
                    </div>
                </div>

                <div className="flex gap-4 paymentFormInput ">
                    <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Data de expiração
                        </label>
                        <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Código de segurança
                        </label>
                        <input
                            type="text"
                            placeholder="CVV"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </form>
        </motion.div>
    );
}
