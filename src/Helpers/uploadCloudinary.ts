import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

interface UploadOptions {
  folder: string;
  isVideo?: boolean; // Optional flag for video-specific settings
  generateThumbnail?: boolean; // Optional thumbnail generation
}

class CloudinaryUploader {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file: File, options: UploadOptions): Promise<UploadApiResponse> {
    try {
      const buffer = await file.arrayBuffer();
      const bytes = Buffer.from(buffer);

      const uploadOptions: any = {
        resource_type: "auto", // Auto-detect image or video
        folder: options.folder,
        async: true,
        transformation: [{ quality: "auto", fetch_format: "auto" }], // Auto quality/format
      };

      // Video-specific settings
      if (options.isVideo) {
        uploadOptions.eager = [
          {
            streaming_profile: "hd", // HLS streaming for videos
            format: "m3u8",
          },
        ];
        uploadOptions.eager_async = true;
      }
      // Thumbnail generation
      if (options.generateThumbnail) {
        uploadOptions.eager = uploadOptions.eager || [];
        uploadOptions.eager.push({ width: 300, crop: "fill" }); // Thumbnail size
      }

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(error);
          }
          console.log("Upload Result:", result);
          return resolve(result as UploadApiResponse);
        }).end(bytes);
      });
    } catch (error) {
      console.error("Error in CloudinaryUploader.upload:", error);
      throw error;
    }
  }
  async delete(publicId: string, resourceType: "image" | "video" = "video"): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      console.log(`Deleted ${resourceType} with public_id: ${publicId}`);
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      throw error;
    }
  }
}

export default CloudinaryUploader;