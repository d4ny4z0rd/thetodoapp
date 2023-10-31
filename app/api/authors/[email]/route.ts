import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params} : {params : {email : string}}
) {
    try {
        const email = params.email;
        const todos = await prisma.user.findUnique({
            where: { email },
            include: {
                todos: { orderBy: { createdAt: "desc" } },
            },
        });
        return NextResponse.json(todos);
    } catch (error) {
        return NextResponse.json({ message: "Could not fetch todos" });
    }
}