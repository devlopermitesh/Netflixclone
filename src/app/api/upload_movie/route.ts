import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import CloudinaryUploader from "@/Helpers/uploadCloudinary";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
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
            [thumbnailResult, trailerResult, videoResult] = await Promise.all([
              uploader.upload(thumbnail!, { folder: "thumbnail", isVideo: false, generateThumbnail: false }),
              uploader.upload(trailer!, { folder: "trailer", isVideo: true, generateThumbnail: true }),
              uploader.upload(video!, { folder: "Movies", isVideo: true, generateThumbnail: true }),
            ]);
      // Check if any upload is still "pending"
      const pendingUploads = [thumbnailResult, trailerResult, videoResult].filter(
        (result) => result.status === "pending"
      );

      if (pendingUploads.length > 0) {
        // Return early with "pending" status
        return NextResponse.json(
          {
            success: true,
            message: "Upload started—processing in background. Check back later!",
            data: {
              thumbnailPublicId: thumbnailResult.public_id || null,
              trailerPublicId: trailerResult.public_id || null,
              videoPublicId: videoResult.public_id || null,
              batchIds: [thumbnailResult.batch_id, trailerResult.batch_id, videoResult.batch_id],
            },
          },
          { status: 202 } // Accepted, processing pending
        );
      }
            // Check if all uploads succeeded
            if (!thumbnailResult?.secure_url || !trailerResult?.secure_url || !videoResult?.secure_url) {
              throw new Error("One or more uploads failed to return a secure URL");
            }
          } catch (error: any) {
            // Rollback: Delete uploaded files if any failed
            const rollbackPromises: Promise<void>[] = [];
            if (thumbnailResult?.public_id) {
              rollbackPromises.push(uploader.delete(thumbnailResult.public_id, "image"));
            }
            if (trailerResult?.public_id) {
              rollbackPromises.push(uploader.delete(trailerResult.public_id, "video"));
            }
            if (videoResult?.public_id) {
              rollbackPromises.push(uploader.delete(videoResult.public_id, "video"));
            }
      
            if (rollbackPromises.length > 0) {
              await Promise.all(rollbackPromises);
              console.log("Rollback complete—deleted uploaded files from Cloudinary");
            }
      
            return NextResponse.json(
              {
                success: false,
                message: error.message || "Failed to upload one or more files",
                details: error.http_code ? `Cloudinary Error: ${error.message}` : undefined,
              },
              { status: error.http_code || 500 }
            );
          }
      
      
function formatDuration(seconds:number):string {
  const minutes = Math.floor(seconds / 60); 
  const remainingSeconds = Math.floor(seconds % 60); // Bacha hua seconds
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} Minutes`; 

}
const duration= formatDuration(videoResult.duration)
        await prismadb.movies.create({
            data: {
                title: title ? title.toString() : "",
                description: description ? description.toString() : "",
                genre: genre ? genre.toString() : "",
                thumbnailUrl: thumbnailResult.secure_url,
                trailerUrl: trailerResult.secure_url,
                VidoeUrl: videoResult.secure_url || "N/A",
                duration ,
            },
        });

        return NextResponse.json(
            { success: true, message: "Movie uploaded successfully" },
            { status: 200 }
        );

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
