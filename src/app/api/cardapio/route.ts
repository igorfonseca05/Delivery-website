import { NextResponse, NextRequest } from "next/server";

import { dbConnect } from "../../../../db/dbConnection";
import MenuModel from "../../../../model/foodModel";

import { MenuSchemaZod } from "@/lib/definitions";

export async function GET(req: NextRequest) {
    try {
        // Obtendo queryParams com um objeto
        const queryParamsObj = Object.fromEntries(req.nextUrl.searchParams.entries())

        await dbConnect()
        const pratos = await MenuModel.find(queryParamsObj)

        return NextResponse.json(pratos)
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