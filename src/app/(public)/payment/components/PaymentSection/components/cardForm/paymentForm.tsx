
import { FormEvent, useEffect, useState } from "react";
import { Lock, CreditCard, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    thumbnail: string
}
interface BrandPros {
    id: string
    name: string
    payment_type_id: string
    status: string
    thumbnail: string
}

export default function CardForm({ paymentMethod, handlePrevious, moveToTheNextForm }: CardFormProps) {



    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expirationYear, setExpirationYear] = useState('')
    const [expirationMonth, setExpirationMonth] = useState('')
    const [securityCode, setSecurityCode] = useState('')

    const [expirationData, setExpirationData] = useState('')

    const [isValid, setIsValid] = useState<boolean | string>('')
    const [inputBorder, setInputBorder] = useState<string>('grayBorder')
    const [cardBrands, setCardBrands] = useState<CardBrandPros[]>();
    const [dataCount, setDataCount] = useState<number>(2)
    let [count, setCount] = useState(4)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [userCardBrand, setUserCardBrand] = useState<string | null>('')

    useEffect(() => console.log(userCardBrand), [userCardBrand])

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
    }


    function detectarBandeira(cleanCardNumber: string): string | null {
        if (/^4\d{12}(\d{3})?$/.test(cleanCardNumber)) return 'visa';
        if (/^5[1-5]\d{14}$/.test(cleanCardNumber)) return 'mastercard';
        if (/^3[47]\d{13}$/.test(cleanCardNumber)) return 'amex';
        if (/^3(0[0-5]|[68])\d{11}$/.test(cleanCardNumber)) return 'diners';
        if (/^6(?:011|5\d{2})\d{12}$/.test(cleanCardNumber)) return 'discover';
        if (/^(636368|438935|504175|451416|636297|5067|4576|4011)\d*/.test(cleanCardNumber)) return 'elo';
        if (/^(606282|3841)\d*/.test(cleanCardNumber)) return 'hipercard';

        return null;
    }


    function validateCreditCardNumber(creditCardNumber: string) {
        setCardNumber(creditCardNumber)

        const cleanCardNumber = creditCardNumber.replace(/\D/g, '');

        const cardBrand = detectarBandeira(cleanCardNumber)

        // console.log(cardBrand, 1)
        if (cleanCardNumber.length > 6 && userCardBrand === '' && cardBrand) {
            setUserCardBrand(cardBrand)
        }


        // if (cleanCardNumber.length > 6) {
        // }

        const lengthCardNumber = /^.{13,19}$/g.test(cleanCardNumber)
        cleanCardNumber.length === 0 ? setIsValid('') : setIsValid(lengthCardNumber)
        lengthCardNumber && luhnAlgorithem(cleanCardNumber)

    }


    function handleCreditCardForm(e: FormEvent) {
        e.preventDefault()

        const cardInfos = {
            cardName,
            cardNumber,
            expirationMonth,
            expirationYear,
            securityCode
        }

        console.log(cardInfos)
    }

    useEffect(() => {

        cardNumber.length === 0 && setCount(4)

        if (cardNumber.length === count) {
            setCardNumber(`${cardNumber} `)
            setCount(count += 5)
        }
    }, [cardNumber.length])


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
        async function getCardBin() {
            const cleanNumber = cardNumber.replace(/\D/g, '')

            if (cleanNumber.length !== 6) return setUserCardBrand('')

            const storageBin = localStorage.getItem('cardBinUser')
            const parsedBin: { id: string, bin: string } = storageBin ? JSON.parse(storageBin) : ''

            if (parsedBin.bin === cleanNumber) return setUserCardBrand(parsedBin.id)

            try {
                const res = await fetch(`/api/payment/bin?bin=${cleanNumber}`)

                if (!res.ok) {
                    throw new Error('erro')
                }

                const brand: BrandPros = await res.json()
                setUserCardBrand(brand.id)
                localStorage.setItem('cardBinUser', JSON.stringify({ bin: cleanNumber, id: brand.id }))
                console.log('dado remoto')

            } catch (error) {
                console.log(error)
            }

        }
        getCardBin()
    }, [cardNumber])


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form className=" w-full mx-auto space-y-6" onSubmit={handleCreditCardForm}>
                <div>
                    <h2 className="text-lg font-semibold">Informações do cartão</h2>
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
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div className={`flex items-center border-2 rounded px-3 py-2 ${isValid === '' ? 'border-gray-300' : `${isValid ? `border-green-500` : 'border-red-500'}`}`}>
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
                        <div className={` flex items-center w-full border-2 rounded pr-3 py-2 text-sm 
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
                    <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Código de segurança
                        </label>
                        <input
                            onChange={(e) => setSecurityCode(e.target.value)}
                            type="text"
                            name='securityCode'
                            required
                            placeholder="CVV"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

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