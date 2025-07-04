import { NextRequest, NextResponse } from 'next/server'

interface PaymentMethod {
    id: string; // ex: 'visa', 'master'
    name: string; // ex: 'Visa', 'Mastercard'
    status: 'active' | 'inactive';
    bins: (number | string)[];
    secure_thumbnail: string; // logo da bandeira
};


interface MercadoPagoPaymentMethodsResponse {
    paging: {
        total: number;
        limit: number;
        offset: number;
    };
    results: PaymentMethod[];
};

interface BinProps {
    bandeira: string,
    id: string
    logo: string

}


export async function GET(req: NextRequest) {
    const bin = req.nextUrl.searchParams.get('bin')

    if (!bin || bin.length !== 6) {
        return NextResponse.json({ message: 'BIN inválido' }, { status: 400 })
    }

    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payment_methods/search?bin=${bin}&site_id=MLB`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json', // boa prática
                },
                cache: 'no-store', // opcional, evita cache do fetch em dev
            })

        const data: MercadoPagoPaymentMethodsResponse = await response.json()

        if (!response.ok) {
            console.error('Erro Mercado Pago:', data)
            return NextResponse.json({ message: 'Erro ao obter BIN', error: data }, { status: response.status })
        }

        const bins = data.results.find(item => item.status === 'active' && item.bins.includes(Number(bin)))

        if (!bins) {
            return NextResponse.json({ message: 'Bin não encontrado', error: data }, { status: response.status })
        }

        return NextResponse.json(bins)
    } catch (error) {
        console.error('Erro geral:', error)
        return NextResponse.json({ message: 'Erro interno ao buscar BIN' }, { status: 500 })
    }
}
