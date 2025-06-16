import { NextResponse, NextRequest } from "next/server";

import { dbConnect } from "../../../../db/dbConnection";
import MenuModel from "../../../../model/foodModel";

import { MenuSchemaZod } from "@/lib/definitions";
// import foodModel from "../../../../model/foodModel";


export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const pratos = await MenuModel.find()
        return NextResponse.json({ cardapio: pratos })
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao obter dados da API' })
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

        const newDish = new MenuModel(body)
        await newDish.save()

        return NextResponse.json({ message: 'oi' })

    } catch (error) {
        console.log(error)
    }
}

export async function PUT(req: Request) { }

export async function DELETE(req: Request) { }

export async function PATCH(req: Request) { }