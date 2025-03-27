import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import ServerAuth from "../../../../../lib/serverAuth";

export async function GET(
    request: NextRequest,
    context: { params: { movieId: string } }
  ) {
  try {

    const { movieId } = (await context.params);
    if (!movieId) {
      return NextResponse.json(
        { success: false, error: "Movie ID is required" },
        { status: 400 }
      );
    }
    // Authenticate User (Optional)
    await ServerAuth(request);

    // ✅ Fetch Movie Details
    const movie = await prismadb.movies.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json(
        { success: false, error: "Movie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: movie }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie:", error);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
