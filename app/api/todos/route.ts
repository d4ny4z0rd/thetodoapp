import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const { title } = await req.json();
    const authorEmail = "prabhavdixit007@gmail.com";
    if (!title) {
        return NextResponse.json(
            { error: "Title is required" },
            { status: 400 },
        );
    }
    try {
        const newTodo = await prisma.todo.create({
            data: {
                title: title,
                authorEmail,
            }
        });
        console.log("Post created");
        return NextResponse.json(newTodo);
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ message: "Couldn't create todo" }, {status : 500});
    }
}