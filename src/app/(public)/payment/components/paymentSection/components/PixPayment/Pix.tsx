import { motion } from 'framer-motion'

export default function Pix() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=' relative m-auto mb:p-0 flexflex-col overflow-hidden'>
            <div className="mb-4 bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                <p className="text-sm text-amber-800">
                    💡 Você selecionou <strong>Pix</strong> como forma de pagamento.
                </p>
            </div>
            <div className=" rounded-lg p-2 text-sm text-gray-700 leading-relaxed mb-2">
                <p className="font-medium mb-2">💸 Pagar com Pix é simples:</p>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Clique no botão <strong>"Próximo"</strong></li>
                    <li>Verifique os itens do seu pedido</li>
                    <li>Clique em <strong>“Finalizar Pedido”</strong> para gerar o QR Code.</li>
                    <li>Escaneie o QR Code com o app do seu banco.</li>
                    <li>Após o pagamento, seu pedido será confirmado automaticamente.</li>
                </ol>
                <p className="mt-3 text-xs text-gray-500">
                    Você poderá voltar para ajustar o endereço ou a forma de pagamento a qualquer momento.
                </p>
            </div>

        </motion.div>
    );
};