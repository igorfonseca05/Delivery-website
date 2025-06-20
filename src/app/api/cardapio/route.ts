import { NextResponse, NextRequest } from "next/server";

import { dbConnect } from "../../../../db/dbConnection";
import MenuModel from "../../../../model/foodModel";

import { MenuSchemaZod } from "@/lib/definitions";
// import foodModel from "../../../../model/foodModel";


export async function GET(req: NextRequest) {
    try {

        const origin = req.headers.get('origin') || '*'

        // Obtendo queryParams com um objeto
        const queryParamsObj = Object.fromEntries(req.nextUrl.searchParams.entries())

        await dbConnect()
        const pratos = await MenuModel.find(queryParamsObj)

        const response = NextResponse.json(pratos)

        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

        return response
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao obter dados da API' }, { status: 500 });
    }
}

export async function HEAD(req: Request) { }

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const valid = MenuSchemaZod.safeParse(body)

        if (!valid.success) {
            return NextResponse.json(
                { message: valid.error?.format() },
                { status: 400 }
            )
        }

        const newDish = new MenuModel(valid.data)
        await newDish.save()

        return NextResponse.json({ message: 'oi' })

    } catch (error) {
        return NextResponse.json({ message: 'Erro ao salvar novo prato' }, { status: 500 });

    }
}

export async function PUT(req: Request) { }

export async function DELETE(req: Request) { }

export async function PATCH(req: Request) { }