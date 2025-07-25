
import { X } from 'lucide-react'
import z from 'zod'

export const MenuSchemaZod = z.object({
    category: z.string()
        .min(4, { message: 'O nome da categoria precisa ter pelo menos 4 caracteres' })
        .trim()
        .toLowerCase(),

    name: z.string()
        .min(3, { message: 'O nome do prato deve conter pelo menos 3 letras' })
        .trim()
        .toLowerCase(),

    description: z.string()
        .min(50, { message: 'Descrição precisa ter no minimo 20 caracteres' })
        .max(196, { message: 'Descrição deve conter no máximo 196 caracteres' })
        .trim()
        .toLowerCase(),

    image: z.string().url(),

    sizes: z.array(
        z.object({
            type: z.string()
                .min(3, { message: 'Tipo deve conter no minimo 3 caracteres' })
                .trim()
                .toLowerCase(),
            price: z.number({
                required_error: 'Preço é obrigátorio',
                invalid_type_error: 'Preço deve ser um número'
            }),
        })
    ).min(1, { message: "Pelo menos um tamanho deve ser incluído" })
})


//   const cardInfos = {
//             cardholder: cardName,
//             identification: {
//                 type: 'CPF',
//                 number: documentNumber
//             },
//             cardNumber,
//             expirationMonth,
//             expirationYear,
//             securityCode,
//             cardBrand,
// }

export const cardSchema = z.object({
    cpf: z.string().regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos"),
    cardholder: z.string().min(3, {message: 'Nome muito curto'}),
    cardNumber: z.string(),
    expirationMonth: z.string(),
    expirationYear: z.string(),
    securityCode: z.string().regex(/^\d{3,4}$/, "CVV deve ter 3 ou 4 dígitos"),
    cardBrand: z.string()
})