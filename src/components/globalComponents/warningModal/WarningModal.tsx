import { AlertCircle, X } from 'lucide-react';
import { useWarningModalContext } from '../../../../context/warningModalContext';
import { useToggleCartContext } from '../../../../context/toggleCartContext';
import Link from 'next/link';

export function GuestCheckoutWarning() {

    const { setIsOpen } = useWarningModalContext()
    const { setCartIsOpen } = useToggleCartContext()

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative cardAnimate">
                {/* Botão de fechar */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Fechar"
                >
                    <X size={20} />
                </button>

                {/* Cabeçalho */}
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="text-yellow-500" size={28} />
                    <h2 className="text-lg font-semibold text-gray-800">
                        Atenção!
                    </h2>
                </div>

                {/* Warning message */}
                <p className="text-gray-600 text-sm leading-relaxed">
                    Você está prestes a finalizar sua compra sem fazer login.
                    Nesse caso, <strong>não será possível acompanhar o status do pedido</strong> posteriormente.
                </p>

                {/* Warning buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <Link href={'/payment'}
                        onClick={() => {
                            setIsOpen(false)
                            setCartIsOpen(false)
                        }}
                        className="w-full sm:w-auto border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        Continuar assim mesmo
                    </Link>

                    <Link href={'/login'}
                        className="button_primary_medium hover:bg-yellow-600 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Fazer login
                    </Link>
                </div>
            </div>
        </div>
    );
}
