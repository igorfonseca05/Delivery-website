import { NextRequest, NextResponse } from 'next/server'

interface PaymentMethod {
    id: string; // ex: 'visa', 'master'
    name: string; // ex: 'Visa', 'Mastercard'
    status: 'active' | 'inactive';
    bins: (number | string)[];
    secure_thumbnail: string; // logo da bandeira
};


interface MercadoPago_Bin {
    paging: {
        total: number;
        limit: number;
        offset: number;
    };
    results: PaymentMethod[];
};


interface CardBinData {
    number: {} // vazio conforme seu exemplo

    scheme: string // ex: "visa"
    type: string   // ex: "credit"
    brand: string  // ex: "Visa Classic"

    country: {
        numeric: string  // "76"
        alpha2: string   // "BR"
        name: string     // "Brazil"
        emoji: string    // "🇧🇷"
        currency: string // "BRL"
        latitude: number // -10
        longitude: number // -55
    }

    bank: {
        name: string // "Banco Do Brasil S.A."
    }
}


async function fetchCardBinData(bin: string): Promise<CardBinData> {
    const response = await fetch(`https://lookup.binlist.net/${bin}`)

    if (!response.ok) {
        throw new Error('Erro na requisição externa')
    }

    const data: CardBinData = await response.json()
    return data
}


async function getBin(bin: string, offset = 0) {

    let response = await fetch(`https://api.mercadopago.com/v1/payment_methods/search?bin=${bin}&site_id=MLB&offset=${offset}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json', // boa prática
            },
            cache: 'no-store', // opcional, evita cache do fetch em dev
        })

    const data: MercadoPago_Bin = await response.json()

    if (!response.ok) {
        console.error('Erro Mercado Pago:', data)
        return NextResponse.json({ message: 'Erro ao obter BIN' }, { status: response.status })
    }

    const bins = data.results.find(item => item.status === 'active' && item.bins.includes(Number(bin)))

    if (!bins) {
        const secondPage = data.paging.offset + data.paging.limit

        if (secondPage >= data.paging.total) {
            let response = await fetchCardBinData(bin)
            if (response) return response
            return null
        }

        return await getBin(bin, secondPage)
    }

    return bins
}


export async function GET(req: NextRequest) {
    const bin = req.nextUrl.searchParams.get('bin')

    if (!bin || bin.length !== 6) {
        return NextResponse.json({ message: 'BIN inválido' }, { status: 400 })
    }

    try {

        const found = await getBin(bin)

        if (!found) {
            return NextResponse.json({ message: 'Bin não encontrado' }, { status: 404 });
        }

        return NextResponse.json(found, {
            headers: {
                'Cache-Control': 'no-store'
            }
        })

    } catch (error) {
        return NextResponse.json({ message: 'Erro interno ao buscar BIN' }, { status: 500 })
    }
}
