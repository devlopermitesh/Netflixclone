import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import ServerAuth from "../../../../lib/serverAuth";




export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("body",body)
    if (!body || !body.MovieId) {
      return NextResponse.json({ error: "movieId is required" }, { status: 400 });
    }
    const {  MovieId:movieId } = body;
        const user = await ServerAuth(request);
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    // Check if Movie Already Exists in Favorites
    if (user.favoritesIds.includes(movieId)) {
      return NextResponse.json({ error: "Movie is already in favorites" }, { status: 409 }); 
    }

    // Update User's Favorite Movies
    const updatedUser = await prismadb.user.update({
      where: { id: user.id },
      data: { favoritesIds: [...user.favoritesIds, movieId] },
    });

    // Return Success Response
    return NextResponse.json({ message: "Movie added to favorites", updatedUser }, { status: 200 });

  } catch (error) {
    console.error("Error adding favorite movie:", error);

    // Handle Specific Prisma Errors
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ 7. Catch-All Internal Server Error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    try {
      const body = await request.json();
      if (!body || !body.MovieId) {
        return NextResponse.json({ error: "movieId is required" }, { status: 400 });
      }
  
      const {  MovieId:movieId } = body;
  
      const user = await ServerAuth(request);
      if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
      }
  
      if (!user.favoritesIds.includes(movieId)) {
        return NextResponse.json({ error: "Movie not found in favorites" }, { status: 404 });
      }
  
      const updatedUser = await prismadb.user.update({
        where: { id: user.id },
        data: { favoritesIds: user.favoritesIds.filter((id) => id !== movieId) },
      });
  
      return NextResponse.json({ message: "Movie removed from favorites", updatedUser }, { status: 200 });
  
    } catch (error) {
      if (error instanceof Error && error.message.includes("Record to update not found")) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
