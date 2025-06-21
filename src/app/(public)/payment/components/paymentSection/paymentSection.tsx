
export default function CardForm() {
    return (
        <form className="max-w-md w-full mx-auto space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Card information</h2>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Name on card
                </label>
                <input
                    type="text"
                    placeholder="John Smith"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Credit card number
                </label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    {/* Cartão de crédito logo */}
                    <img src="/visa-logo.png" alt="Visa" className="w-8 h-5 mr-2" />
                    <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        className="flex-1 text-sm bg-transparent outline-none"
                    />
                    {/* Cadeado */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-500 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m0-6a2 2 0 00-2 2v1h4v-1a2 2 0 00-2-2zm0-4a4 4 0 00-4 4v2h8V9a4 4 0 00-4-4z"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 ">
                <div className="flex-1 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Expiration date
                    </label>
                    <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Security code
                    </label>
                    <input
                        type="text"
                        placeholder="CVV"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </form>
    );
}
