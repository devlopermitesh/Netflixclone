import { NextRequest, NextResponse } from "next/server";
import ServerAuth from "../../../../lib/serverAuth";
import prismadb from "../../../../lib/prismadb"
export async function GET(request: NextRequest) {
    try {
      const user = await ServerAuth(request);
      if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
      }
  
      if (!user.favoritesIds || user.favoritesIds.length === 0) {
        return NextResponse.json({ movies: [] }, { status: 200 });
      }
  
      const favoriteMovies = await prismadb.movies.findMany({
        where: {
          id: { in: user.favoritesIds },
        },
      });
  
      return NextResponse.json({ movies: favoriteMovies }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
