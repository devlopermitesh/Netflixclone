import { NextResponse, NextRequest } from "next/server";
import prismadb from "../../../../lib/prismadb"
import ServerAuth from "../../../../lib/serverAuth";
export async function GET(request: NextRequest) {
    try {
        await ServerAuth(request);
        const movies = await prismadb?.movies.findMany();
        return NextResponse.json({ movies }, { status: 200 });
    } catch (error) {
        console.error("Error fetching movies:", error);
        return NextResponse.json({ error: "Failed to fetch movies. Please try again later." }, { status: 500 });
    }
}