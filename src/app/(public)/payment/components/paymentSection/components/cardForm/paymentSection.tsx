
import { FormEvent, useEffect, useState } from "react";
import { Lock, CreditCard, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { boolean } from "zod/v4";
import { PiSpinner } from "react-icons/pi";
import { useFetchData } from "../../../../../../../../hooks/useFetch";

interface CardFormProps {
    paymentMethod: number,
    handlePrevious: () => void,
    moveToTheNextForm: () => void
}

export default function CardForm({ paymentMethod, handlePrevious, moveToTheNextForm }: CardFormProps) {

    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expirationYear, setExpirationYear] = useState('')
    const [expirationMonth, setExpirationMonth] = useState('')
    const [securityCode, setSecurityCode] = useState('')

    const [isValid, setIsValid] = useState<boolean | string>('')
    const [isValidDate, setIsValidDate] = useState<boolean | string>('')
    const [CardBrand, setCardBrand] = useState<string | null>(null);


    function validateExperationData(data: string) {
        if (data.length === 0) return setIsValidDate('')
        if (!data || data.length < 6) return setIsValidDate(false)

        const cleanData = data.replace(/\D/g, '');

        const inputMonth = cleanData.slice(0, 2)
        const inputYear = cleanData.slice(2)

        const date = new Date()

        let month: string | number = date.getMonth() + 1
        const year = String(date.getFullYear())

        month = month <= 9 ? `0${month}` : month


        if ((inputMonth >= month && inputMonth <= '12' && inputYear === year) || (inputMonth <= '12' && inputYear > year)) {
            setIsValidDate(true)
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

        isValid && setCardNumber(card)
        setIsValid(isValid)
    }


    function detectarBandeira(cleanCardNumber: string): string | null {
        // const clean = numero.replace(/\D/g, '');

        console.log(cleanCardNumber)

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

        const cardbNumberOnlyNumbers = creditCardNumber.replace(/\D/g, '');

        const CardBrand = detectarBandeira(cardbNumberOnlyNumbers)

        console.log(CardBrand)

        const lengthCardNumber = /^.{13,19}$/g.test(cardbNumberOnlyNumbers)

        cardbNumberOnlyNumbers.length === 0 ? setIsValid('') : setIsValid(lengthCardNumber)

        lengthCardNumber && luhnAlgorithem(cardbNumberOnlyNumbers)

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
        async function getCardBrand() {
            try {

                // const res = await fetch('http://localhost:3000/api/')

            } catch (error) {

            }
        }

    }, [])


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
                        onChange={(e) => setCardName(e.target.value)}
                        name="cardName"
                        type="text"
                        required
                        placeholder="Marcelo Santos"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Número do cartão
                    </label>
                    <div className={`flex items-center border-2 rounded px-3 py-2 ${isValid === '' ? 'border-gray-300' : `${isValid ? `border-green-500` : 'border-red-500'}`}`}>
                        {/* Cartão de crédito logo */}
                        <CreditCard className="text-black/30" />
                        <input
                            onChange={(e) => validateCreditCardNumber(e.target.value)}
                            type="text"
                            name='cardNumber'
                            required
                            placeholder="Nº cartão"
                            className="flex-1 pl-2 text-sm bg-transparent outline-none"
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
                                ${isValidDate === '' ? `border-gray-300` :
                                `${isValidDate ? 'border-green-500' : 'border-red-500'}`} outline-none`}>
                            <input
                                onChange={(e) => validateExperationData(e.target.value)}
                                type="text"
                                name='expirationData'
                                required
                                placeholder="MM/AAAAA"
                                className={`flex-1 pl-2 text-sm bg-transparent outline-none`}
                            />
                            {isValidDate && <Check className="w-5 h-5 text-green-500" />}
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
