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
        <div className="bg-white p-4 rounded-2xl shadow-md border w-190 border-gray-200 mb-6">
            <p className="text-gray-800 font-medium text-sm mb-2">
                Ou, se preferir, copie o código Pix abaixo:
            </p>
            <div className="flex flex-col items-start justify-between gap-3">
                <pre className="text-sm text-gray-700 font-mono bg-gray-100 p-3 rounded-xl w-full max-h-36 overflow-auto whitespace-pre-wrap">
                    {pixCode}
                </pre>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-400 hover:bg-orange-600 text-white text-sm rounded-xl transition"
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
