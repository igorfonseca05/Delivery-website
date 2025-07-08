
import { FormEvent, useEffect, useRef, useState } from "react";
import { Lock, CreditCard, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { boolean } from "zod/v4";
import { PiSpinner } from "react-icons/pi";
import { useFetchData } from "../../../../../../../../hooks/useFetch";
import { selectEnvironment } from "../../../../../../../../utils/helperFunctions";


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
        security_code: {
            length: number
        }
    }
    ]
}

interface CardBinExternalAPI {
    schema: string
}


export default function CardForm({ paymentMethod, handlePrevious, moveToTheNextForm }: CardFormProps) {

    // const binCache = new Map<string, string>()
    const binCache = useRef(new Map<string, string>())


    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expirationYear, setExpirationYear] = useState('')
    const [expirationMonth, setExpirationMonth] = useState('')
    const [securityCode, setSecurityCode] = useState('')
    const [email, setEmail] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');


    const [expirationData, setExpirationData] = useState('')

    const [isValid, setIsValid] = useState<boolean | string>('')
    const [inputBorder, setInputBorder] = useState<string>('grayBorder')
    const [cardBrands, setCardBrands] = useState<CardBrandPros[]>();
    const [dataCount, setDataCount] = useState<number>(2)
    let [count, setCount] = useState(4)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [securityCodeLength, setSecurityCodeLength] = useState(0)
    const [userCardBrand, setUserCardBrand] = useState<string | null>('')



    function getType(obj: CardBrandPros): obj is CardBrandPros {
        return (obj as CardBrandPros).id !== undefined
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

        const lengthCardNumber = /^.{13,19}$/g.test(cleanCardNumber)
        cleanCardNumber.length === 0 ? setIsValid('') : setIsValid(lengthCardNumber)
        lengthCardNumber && luhnAlgorithem(cleanCardNumber)

    }


    function handleCreditCardForm(e: FormEvent) {
        e.preventDefault()

        const cardInfos = {
            cardholder: {
                name: cardName
            },
            cardNumber,
            expirationMonth,
            expirationYear,
            securityCode,
            userCardBrand
        }

        console.log(cardInfos)
    }

    // useEffect(() => {
    //     cardNumber.length === 0 && setCount(4)

    //     if (cardNumber.length === count) {
    //         setCardNumber(`${cardNumber} `)
    //         setCount(count += 5)
    //     }
    // }, [cardNumber.length])


    // Altera string expirationData adicionando /
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


    useEffect(() => {
        async function getCardBrand() {
            const cached = localStorage.getItem('cardBrands')
            if (cached) {
                setCardBrands(JSON.parse(cached))
                setLoading(false)
                return
            }

            try {
                const res = await fetch('/api/payment/cardbrand')
                const data = await res.json()
                localStorage.setItem('cardBrands', JSON.stringify(data))
                setCardBrands(data)
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
        if (!userCardBrand) return

        if (userCardBrand.toLowerCase() === 'amex' || userCardBrand.toLowerCase() === 'american express') {
            setSecurityCodeLength(4);
        }

        setSecurityCodeLength(3)
    }, [userCardBrand])


    // function getBin(brand: string) {
    //     if (binCache.current.has(brand)) {
    //         const cachedBrand = binCache.current.get(brand)

    //         if (!cachedBrand) return

    //         setUserCardBrand(cachedBrand)
    //     }
    // }


    useEffect(() => {
        async function getCardBin() {
            const cleanNumber = cardNumber.replace(/\D/g, '')

            if (cleanNumber.length < 6) return setUserCardBrand('')

            const storageBin = localStorage.getItem('cardBinUser')
            const parsedBin: { id: string, bin: string } = storageBin ? JSON.parse(storageBin) : ''

            if (parsedBin.bin === cleanNumber || cleanNumber.length > 6) return setUserCardBrand(parsedBin.id)

            try {
                const res = await fetch(`/api/payment/bin?bin=${cleanNumber}`)

                if (!res.ok) {
                    throw new Error('erro')
                }

                const brand = await res.json()

                if (getType(brand)) {
                    setUserCardBrand(brand.id)
                    setSecurityCodeLength(brand.settings[0].security_code.length)
                    localStorage.setItem('cardBinUser', JSON.stringify({ bin: cleanNumber, id: brand.id }))
                } else {
                    setUserCardBrand(brand.scheme)
                    localStorage.setItem('cardBinUser', JSON.stringify({ bin: cleanNumber, id: brand.scheme }))
                }

                console.log('dado remoto')

            } catch (error) {
                console.log(error)
            }

        }
        getCardBin()
    }, [cardNumber])


    useEffect(() => {
        function cleanPrivateData() {
            localStorage.removeItem('cardBinUser')
        }

        return () => cleanPrivateData()

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
                        onChange={(e) => setDocumentNumber(e.target.value)}
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
                            ) : error || !Array.isArray(cardBrands) ? (
                                <p>Falha ao obter bandeiras</p>
                            ) : (
                                <div className="flex gap-x-2">
                                    {cardBrands.map(brand => (
                                        <img
                                            key={brand.id}
                                            src={brand.thumbnail}
                                            alt={brand.name}
                                            title={brand.name}
                                            className={`h-5 ${userCardBrand === '' ? 'opacity-100' :
                                                `${userCardBrand === brand.id ? 'opacity-100' : 'opacity-0 hidden transition'}`}`}
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
                            maxLength={23}
                            placeholder="Nº cartão"
                            className="flex-1 pl-2 text-sm bg-transparent outline-none"
                            onChange={(e) => validateCreditCardNumber(e.target.value)}
                        />
                        {isValid && <Check className="w-5 h-5 text-green-500" />}
                    </div>
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
                    <button type="submit" onClick={moveToTheNextForm} className={`buttonColor flex items-center justify-center gap-x-2 px-20 py-3 w-full md:max-w-70 m-auto md:m-0`}>Próximo <ArrowRight size={18} /> </button>
                </div>
            </form>
        </motion.div>
    );
}