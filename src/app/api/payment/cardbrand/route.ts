import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { MercadoPagoConfig } from "mercadopago";


export async function GET() {
    const res = await fetch('https://api.mercadopago.com/v1/payment_methods', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
    })

    if (!res.ok) {
        return NextResponse.json({ message: 'Error ao obter bandeiras' })
    }

    const data = await res.json();

    const cardsBrands = data.filter(
        (pm: any) => pm.payment_type_id === 'credit_card' && pm.status === 'active'
    );

    return NextResponse.json(cardsBrands)
}
