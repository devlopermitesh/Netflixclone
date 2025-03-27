import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import CloudinaryUploader from "@/Helpers/uploadCloudinary";
import { UploadApiResponse } from "cloudinary";
import { v4 as uuidv4 } from 'uuid'
import ServerAuth from "../../../../lib/serverAuth";
export async function POST(req: NextRequest) {
    try {
      const user=await ServerAuth(req)
      if (user.role !== "Admin") {
          return NextResponse.json(
          { success: false, message: "Unauthorized: Only admins can upload movies" },
          { status: 403 }
          );
      }
        const formData = await req.formData();
        console.log("formData",formData.get("title"))
        const title = formData.get("title") as string | null;
        const description = formData.get("description") as string | null;
        const genre = formData.get("genre") as string | null;
        const thumbnail = formData.get("thumbnailUrl") as File | null;
        const trailer = formData.get("trailerUrl") as File | null;
        const video = formData.get("videoUrl") as File | null;

        // Validation Errors Array
        const errors: string[] = [];

        if (!title) {
            errors.push("Title is required and must be a non-empty string");
        }
        if (!description) {
            errors.push("Description is required and must be a non-empty string");
        }
        if (!genre) {
            errors.push("Genre is required and must be a non-empty string");
        }

        if (!thumbnail) {
            errors.push("Thumbnail is required and must be a valid file");
        } else if (thumbnail.size === 0) {
            errors.push("Thumbnail file cannot be empty");
        }

        if (!trailer) {
            errors.push("Trailer is required and must be a valid file");
        } else if (trailer.size === 0) {
            errors.push("Trailer file cannot be empty");
        } else if (!trailer.type.startsWith("video/")) {
            errors.push("Trailer must be a video file");
        }

        if (!video) {
            errors.push("Video is required and must be a valid file");
        } else if (video.size === 0) {
            errors.push("Video file cannot be empty");
        } else if (!video.type.startsWith("video/")) {
            errors.push("Video must be a video file");
        }

        if (errors.length > 0) {
            return NextResponse.json({ success: false, message: errors.join("; ") }, { status: 400 });
        }

        const uploader = new CloudinaryUploader();
    let thumbnailResult: UploadApiResponse | null = null;
    let trailerResult: UploadApiResponse | null = null;
    let videoResult: UploadApiResponse | null = null;
        try {
            // Upload all files in parallel
            [ trailerResult, videoResult,thumbnailResult] = await Promise.all([
              uploader.upload(trailer!, { folder: "trailer", isVideo: true, generateThumbnail: true }),
              uploader.upload(video!, { folder: "Movies", isVideo: true, generateThumbnail: true }),
              uploader.upload(thumbnail!, { folder: "thumbnail", isVideo: false, generateThumbnail: false }),

            ]);
     console.log("Video data",videoResult)
            const tempRecord = await prismadb.tempUploads.create({
              data: {
                publicId:"12345" , // Reference video public_id
                title: title || "Untitled", // Ensure title is a non-null string
                description: description || "No description provided",
                genre: genre || "Unknown Genre",
                thumbnailUrl: thumbnailResult.secure_url || "",
                trailerUrl: trailerResult.secure_url || "",
                videoUrl: videoResult.secure_url || "",
              },
            });
        
            return NextResponse.json(
              {
                success: true,
                message: "Upload started—processing in background",
                data: { tempId: tempRecord.id, publicIds: [thumbnailResult.public_id, trailerResult.public_id, videoResult.public_id] },
              },
              { status: 202 }
            );

          } catch (error: any) {
            
            return NextResponse.json(
              {
                success: false,
                message: error.message || "Failed to upload one or more files",
                details: error.http_code ? `Cloudinary Error: ${error.message}` : undefined,
              },
              { status: error.http_code || 500 }
            );
          }

    } catch (error:any) {
        if (error.http_code === 400 && error.message.includes("too large to process synchronously")) {
            return NextResponse.json(
              {
                success: false,
                message: "Video too large! Upload succeeded but processing is async—check back later for duration.",
                public_id: error.public_id || "unknown", // If available
              },
              { status: 202 } // Accepted, processing pending
            );
          }
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : "Failed To upload Movie" },
            { status: 500 }
        );
    }
}
