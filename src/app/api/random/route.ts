import { NextRequest, NextResponse } from 'next/server';
import prismadb from "../../../../lib/prismadb"

import ServerAuth from '../../../../lib/serverAuth';
export async function GET(request: NextRequest) {
    try {
        await ServerAuth(request);
const totalMovies=await prismadb.movies.count();
const randomIndex=Math.floor(totalMovies *Math.random())

const randomMovie=await prismadb?.movies.findMany({
    skip:randomIndex,
    take:1
})
return NextResponse.json({data:randomMovie},{status:200})

    } catch (error) {
        console.error('Error during authentication:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
}