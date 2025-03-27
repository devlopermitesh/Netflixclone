import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Webhook:", body);

    if (body.notification_type === "upload") {
      const { public_id, secure_url, duration } = body;
      const temp = await prismadb.tempUploads.findFirst({ where: { publicId: "12345" } });

      function formatDuration(seconds:number):string {
        const minutes = Math.floor(seconds / 60); 
        const remainingSeconds = Math.floor(seconds % 60); // Bacha hua seconds
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} Minutes`; 
      
      }
  
      if (temp) {
if (/thumbnail/.test(public_id)) {
  await prismadb.tempUploads.update({
    where: { id: temp.id },
    data: { thumbnailUrl: secure_url },
  });
} else if (/trailer/.test(public_id)) {
  await prismadb.tempUploads.update({
    where: { id: temp.id },
    data: { trailerUrl: secure_url },
  });
} else if (/Movies/.test(public_id)) {
  await prismadb.tempUploads.update({
    where: { id: temp.id },
    data: { videoUrl: secure_url },
  });

} else {
  throw new Error("Invalid public_id format");
}
// Refresh temp record after update
const updatedTemp = await prismadb.tempUploads.findUnique({ where: { id: temp.id } });

if (
  updatedTemp?.title?.trim() &&
  updatedTemp?.description?.trim() &&
  updatedTemp?.id &&
  updatedTemp?.videoUrl?.trim() &&
  updatedTemp?.trailerUrl?.trim() &&
  updatedTemp?.thumbnailUrl?.trim()
) {
  const movie = await prismadb.movies.create({
    data: {
      title: updatedTemp.title.trim(),
      description: updatedTemp.description.trim(),
      genre: updatedTemp.genre ?? "",
      thumbnailUrl: updatedTemp.thumbnailUrl.trim(),
      trailerUrl: updatedTemp.trailerUrl.trim(),
      VidoeUrl: updatedTemp.videoUrl.trim(), 
      duration:(/Movies/.test(public_id))?formatDuration(duration || 0) :"",
    },
  });

  await prismadb.tempUploads.delete({ where: { id: temp.id } });
  console.log("Movie Saved:", movie);
  return NextResponse.json({ success: true }, { status: 200 });

}
console.log("Processing upload")
return NextResponse.json({ success: true, message: "Processing upload" }, { status: 200 });

      }
      else{

        console.log("No temp record found for publicId: '12345'");
        return NextResponse.json({ success: false, message: "Temp record not found" }, { status: 404 });
      }
    }
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}