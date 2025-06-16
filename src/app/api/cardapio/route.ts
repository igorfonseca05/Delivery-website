import { NextResponse, NextRequest } from "next/server";

import { dbConnect } from "../../../../db/dbConnection";
import MenuModel from "../../../../model/foodModel";

import { MenuSchemaZod } from "@/lib/definitions";


export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const pratos = await MenuModel.find()
        return NextResponse.json({ cardapio: pratos })
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao obter dados da API' })
    }
}

export async function HEAD(re: Request) { }

export async function POST(req: Request) {

    try {
        const body = await req.json()

        const valid = MenuSchemaZod.safeParse(body)

        console.log(valid)

        if (!valid.success) {
            return NextResponse.json(
                { message: valid.error?.format() },
                { status: 400 }
            )
        }

        return NextResponse.json('oi')

    } catch (error) {

    }
}

export async function PUT(req: Request) { }

export async function DELETE(req: Request) { }

export async function PATCH(req: Request) { }