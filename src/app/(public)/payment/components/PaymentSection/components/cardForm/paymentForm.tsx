import { FormEvent, useEffect, useState } from "react";
import { CreditCard, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Info } from "lucide-react";

interface CardFormProps {
    paymentMethod: number,
    handlePrevious: () => void,
    moveToTheNextForm: () => void
}

interface CardBrandPros {
    id: string
    name: string
    payment_type_id: string
    status: string
    thumbnail: string,
    settings: [{
        cardNumber: {
            length: number | undefined
        },
        security_code: {
            length: number
        }
    }
    ]
}

// types/mercadoPago.d.ts

interface Window {
    MercadoPago: any;
}


export default function CardForm({ paymentMethod, handlePrevious, moveToTheNextForm }: CardFormProps) {


    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expirationYear, setExpirationYear] = useState('')
    const [expirationMonth, setExpirationMonth] = useState('')
    const [securityCode, setSecurityCode] = useState('')
    const [documentNumber, setDocumentNumber] = useState('');
    const [expirationData, setExpirationData] = useState('')

    const [isValid, setIsValid] = useState<boolean | string>('')
    const [inputBorder, setInputBorder] = useState<string>('grayBorder')
    const [availablePaymentMethods, setAvaliblePaymentMethods] = useState<CardBrandPros[]>();
    const [dataCount, setDataCount] = useState<number>(2)
    let [count, setCount] = useState(4)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [securityCodeLength, setSecurityCodeLength] = useState(0)
    const [CardNumberLength, setCardNumberLength] = useState<number | undefined>(undefined)
    const [cardBrand, setCardBrand] = useState<string | null>('')
    const [isInvalidBrand, setIsInvalidBrand] = useState(false)

    const [mp, setMp] = useState<any>(null)


    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).MercadoPago) {
            const mp = new (window as any).MercadoPago(process.env.MP_PUBLIC_KEY_TEST);
            setMp(mp)
        }
    }, []);



    function getType(obj: CardBrandPros): obj is CardBrandPros {
        return (obj as CardBrandPros).id !== undefined
    }

    function getBinValueFromLocalStorage(cleanNumber: string) {
        const storageBin = localStorage.getItem('cardBinUser')
        const parsedBin: { id: string, bin: string } = storageBin ? JSON.parse(storageBin) : ''

        const binTypedOnce = parsedBin.bin === cleanNumber
        const fullCardNumber = cleanNumber.length > 6

        if (binTypedOnce || fullCardNumber) return setCardBrand(parsedBin.id)
    }

    function validateExpirationData(data: string) {
        setExpirationData(data)

        const isEmptyDataInput = data.length === 0
        const isInvalidSizeData = data.length < 7

        if (isEmptyDataInput) return setInputBorder('grayBorder')
        if (isInvalidSizeData) return setInputBorder('redBorder')

        const cleanData = data.replace(/\D/g, '');

        const inputMonth = cleanData.slice(0, 2)
        const inputYear = cleanData.slice(2)

        const date = new Date()

        let month: string | number = date.getMonth() + 1
        const year = String(date.getFullYear())

        month = month <= 9 ? `0${month}` : month

        if ((inputMonth >= month && inputMonth <= '12' && inputYear === year) ||
            (inputMonth <= '12' && inputYear > year)) {
            setInputBorder('greenBorder')
            setExpirationMonth(inputMonth)
            setExpirationYear(inputYear)
            return
        }
    }

    function luhnAlgorithem(card: string) {
        let soma = 0;
        let deveDobrar = false

        for (let i = card.length - 1; i >= 0; i--) {
            let digito = parseInt(card.charAt(i))

            if (deveDobrar) {
                digito *= 2;
                if (digito > 9) digito -= 9
            }
            soma += digito
            deveDobrar = !deveDobrar
        }

        const isValid = soma % 10 === 0
        setIsValid(isValid)
        setCardNumber(card)
    }


    function validateCreditCardNumber(creditCardNumber: string) {
        setCardNumber(creditCardNumber)
        const cleanCardNumber = creditCardNumber.replace(/\D/g, '');

        const lengthCardNumber = /^.{15,19}$/g.test(cleanCardNumber)
        lengthCardNumber && luhnAlgorithem(cleanCardNumber)

        cleanCardNumber.length === 0 ? setIsValid('') : setIsValid(lengthCardNumber)
    }


    function handleCreditCardForm(e: FormEvent) {
        e.preventDefault()

        const cardInfos = {
            cardholder: cardName,
            identification: {
                type: 'CPF',
                number: documentNumber
            },
            cardNumber,
            expirationMonth,
            expirationYear,
            securityCode,
            cardBrand,
        }

        console.log(cardInfos)

        moveToTheNextForm()
    }


    useEffect(() => {
        const length = expirationData.length

        if (length === 1) {
            setDataCount(2)
        }

        if (length === dataCount) {
            setExpirationData(`${expirationData}/`)
            setDataCount(0)
        }
    }, [expirationData])

    function brandCache() {
        const cached = localStorage.getItem('availablePaymentMethods')
        if (cached) {
            setAvaliblePaymentMethods(JSON.parse(cached))
            setLoading(false)
            return
        }
    }

    useEffect(() => {
        async function getCardBrand() {
            brandCache()

            try {
                const res = await fetch('/api/payment/cardbrand')
                const data = await res.json()
                setAvaliblePaymentMethods(data)
                localStorage.setItem('availablePaymentMethods', JSON.stringify(data))
            } catch (err: any) {
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        getCardBrand()
    }, [])


    useEffect(() => {
        if (securityCodeLength !== 0) return
        if (!cardBrand) return

        if (cardBrand.toLowerCase() === 'amex' || cardBrand.toLowerCase() === 'american express') {
            setSecurityCodeLength(4);
        }

        setSecurityCodeLength(3)
    }, [cardBrand])


    useEffect(() => {
        if (!cardNumber) return

        async function getCardBin() {
            const cleanNumber = cardNumber.replace(/\D/g, '')
            if (cleanNumber.length !== 6) return

            getBinValueFromLocalStorage(cleanNumber)

            try {
                const res = await fetch(`/api/payment/bin?bin=${cleanNumber}`)

                if (!res.ok) {
                    throw new Error('erro')
                }

                const brand = await res.json()

                if (getType(brand)) {
                    setCardBrand(brand.id)
                    setSecurityCodeLength(brand.settings[0].security_code.length)
                    setCardNumberLength(brand.settings[0].cardNumber.length)
                    localStorage.setItem('cardBinUser', JSON.stringify({ bin: cleanNumber, id: brand.id }))
                } else {
                    const allowedSchemes = ['visa', 'mastercard', 'amex', 'elo', 'hipercard'];
                    const isAllowBrand = allowedSchemes.includes(`${brand.schema}`)

                    if (isAllowBrand) {
                        const cardNumberLengthsByBrand = {
                            visa: 16,
                            master: 19,
                            amex: 15,
                            elo: 16,
                            hipercard: 16,
                        }[`${brand.scheme as string}`]

                        setCardBrand(brand.scheme)
                        setCardNumberLength(cardNumberLengthsByBrand)
                        localStorage.setItem('cardBinUser', JSON.stringify({ bin: cleanNumber, id: brand.scheme }))
                    } else {
                        setIsInvalidBrand(true)
                        localStorage.setItem('cardBinUser', JSON.stringify({ bin: cleanNumber, id: brand.scheme }))
                    }

                }

                console.log('dado remoto')

            } catch (error) {
                console.log(error)
            }

        }
        setIsInvalidBrand(false)
        getCardBin()


    }, [cardNumber])


    useEffect(() => {
        return () => localStorage.removeItem('cardBinUser')
    }, [])



    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form className="w-full mx-auto space-y-4" onSubmit={handleCreditCardForm}>
                <div>
                    <h2 className="text-[clamp(1rem,1em,2rem)] font-semibold text mb-0">Informações do cartão</h2>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        CPF
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                        value={documentNumber}
                        onChange={(e) => {
                            const cleanCPF = e.target.value.replace(/\D/g, '')
                            setDocumentNumber(cleanCPF)
                        }}
                        placeholder="CPF"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Nome escrito no cartão
                    </label>
                    <input
                        name="cardName"
                        type="text"
                        required
                        placeholder="Marcelo Santos"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex gap-x-2 text-sm w-full  justify-between font-medium text-gray-700">
                        <span>Número do cartão</span>
                        <span className="flex gap-x-2">
                            {loading ? (
                                <p className="animate-pulse">Carregando bandeiras...</p>
                            ) : error || !Array.isArray(availablePaymentMethods) ? (
                                <p>Falha ao obter bandeiras</p>
                            ) : (
                                <div className="flex gap-x-2">
                                    {availablePaymentMethods.map(brand => (
                                        <img
                                            key={brand.id}
                                            src={brand.thumbnail}
                                            alt={brand.name}
                                            title={brand.name}
                                            className={`h-5 ${cardBrand === '' ? 'opacity-100' :
                                                `${cardBrand === brand.id ? 'opacity-100' : 'opacity-0 hidden transition'}`}`}
                                        />
                                    ))}
                                </div>
                            )}

                        </span>
                    </label>

                    <div className={`flex items-center border rounded px-3 py-2 ${isValid === '' ? 'border-gray-300' : `${isValid ? `border-green-500` : 'border-red-500'}`}`}>
                        {/* Cartão de crédito logo */}
                        <CreditCard className="text-black/30" />
                        <input
                            value={cardNumber}
                            type="text"
                            name='cardNumber'
                            required
                            maxLength={CardNumberLength}
                            placeholder="Nº cartão"
                            className="flex-1 pl-2 text-sm bg-transparent outline-none"
                            onChange={(e) => validateCreditCardNumber(e.target.value)}
                        />
                        {isValid && <Check className="w-5 h-5 text-green-500" />}
                    </div>
                    <p className={`text-sm bg-red-100 p-2 border-l-3 rounded-lg border-red-600 ${!isInvalidBrand && 'hidden'}`}>
                        <span className="font-bold text-red-950">Bandeira do cartão não aceita.</span>
                        <br></br>
                        <span className="opacity-85">Por favor, utilize um cartão das bandeiras Visa, Mastercard, Elo, Hipercard ou Amex.</span>
                    </p>
                </div>

                <div className="flex gap-4 paymentFormInput ">
                    <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Data de expiração
                        </label>
                        <div className={`flex items-center w-full border rounded pr-3 py-2 text-sm 
                                ${inputBorder === 'grayBorder' ? `border-gray-300` :
                                `${inputBorder === 'greenBorder' ? 'border-green-500' : 'border-red-500'}`} outline-none`}>
                            <input
                                type="text"
                                value={expirationData}
                                name='expirationData'
                                maxLength={7}
                                required
                                placeholder="MM/AAAAA"
                                className={`flex-1 pl-2 text-sm bg-transparent outline-none`}
                                onChange={(e) => validateExpirationData(e.target.value)}
                            />
                            {inputBorder === 'greenBorder' && <Check className="w-5 h-5 text-green-500" />}
                        </div>
                    </div>
                    <div className="flex-1 space-y-2 relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Código de segurança
                        </label>
                        <input
                            onChange={(e) => setSecurityCode(e.target.value)}
                            type="text"
                            name='securityCode'
                            required
                            maxLength={securityCodeLength}
                            value={securityCode}
                            placeholder="CVV"
                            className={`w-full border rounded px-3 py-2 text-sm 
                            ${securityCode.length === 0 ? `border-gray-300` :
                                    `${securityCode.length === securityCodeLength ? 'border-green-500' : 'border-red-500'}`} outline-none`}
                        />
                        <Info size={16} className="absolute right-0 top-0" />
                    </div>
                </div>
                <div className={`flex justify-between gap-x-4 ${paymentMethod !== 3 && 'hidden'}`}>
                    <button onClick={handlePrevious} className={`button_neutral_large flex items-center justify-center gap-x-2 w-full md:max-w-50 m-auto md:m-0`}><ArrowLeft size={18} /> Voltar</button>
                    <button type="submit" className={`buttonColor flex items-center justify-center gap-x-2 px-20 py-3 w-full md:max-w-70 m-auto md:m-0`}>Próximo <ArrowRight size={18} /> </button>
                </div>
            </form>
        </motion.div>
    );
}