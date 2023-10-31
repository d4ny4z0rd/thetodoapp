import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(
    req: Request,
    {params} : {params : {id : string}}
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const id = params.id;
    try {
        const todo = await prisma.todo.delete({ where: { id } });
        return NextResponse.json(todo);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error deleting the todo" });
    }
}

