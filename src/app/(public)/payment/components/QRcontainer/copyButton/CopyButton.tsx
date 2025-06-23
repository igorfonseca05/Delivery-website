import { useState } from "react"
import { Check, Copy } from "lucide-react" // se estiver usando lucide-react (recomendado)

export default function PixCodeBox() {
    const [copied, setCopied] = useState(false)

    const pixCode = `00020126360014BR.GOV.BCB.PIX0114+5599999999995204000053039865405100.005802BR5920Nome Do Recebedor6009Sao Paulo62070503***6304ABCD`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(pixCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Erro ao copiar o código Pix:", err)
        }
    }

    return (
        <div className="bg-white rounded-lg mb-6">
            <p className="text-gray-800 font-medium text-sm mb-2">
                Ou, se preferir, copie o código Pix abaixo:
            </p>
            <div className="flex items-start flex-col justify-between gap-3">
                <pre className="text-sm scrollStyle text-gray-700 font-mono bg-gray-100 p-3 rounded-lg w-full max-h-30 overflow-auto">
                    {pixCode}
                </pre>
                <button
                    onClick={handleCopy}
                    className="flex items-center w-full gap-2 button_neutral_large text text-sm rounded-lg transition"
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            Copiado!
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            Copiar
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
