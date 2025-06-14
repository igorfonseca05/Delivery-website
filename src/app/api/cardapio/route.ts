import { NextResponse, NextRequest } from "next/server";

import { dbConnect } from "../../../../db/dbConnection";
import MenuModel from "../../../../model/foodModel";


export async function GET(request: NextRequest) {
    try {
        await dbConnect()
        const pratos = await MenuModel.find()
        return NextResponse.json({ cardapio: pratos })
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao obter dados da API' })
    }
}

export async function HEAD(request: Request) { }

export async function POST(request: Request) { }

export async function PUT(request: Request) { }

export async function DELETE(request: Request) { }

export async function PATCH(request: Request) { }