import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { MercadoPagoConfig } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' })

export async function POST(req: NextRequest) {
    const body = await req.json()

    return NextResponse.json(body)
}
