"use client"
import Modals from '@/app/Components/Modals'
import { useuploadModel } from '@/hook/useUploadModel'
import { useRouter } from 'next/navigation'
import React,{ useState } from 'react'
import { SubmitHandler, useForm} from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from '@/app/Components/Button'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-toastify'
import { Input } from '@/app/Components/Input'
// Define the schema validation for the Movies model
const uploadMovieSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    genre: z.string().min(1, "Genre is required"),
    thumbnailUrl: z.instanceof(File).refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Invalid Thumbnail image file type. Only JPEG, PNG, or WebP are allowed.',
    }),
    trailerUrl: z.instanceof(File).refine(
      (file) =>
        ["video/mp4", "video/webm", "video/ogg", "video/mkv", "video/quicktime", "video/x-msvideo"].includes(file.type),
      {
        message: "Invalid video file type. Only MP4, WebM, OGG, MKV, MOV, or AVI are allowed.",
      }
    ),
    
    videoUrl:  z.instanceof(File).refine(
      (file) =>
        ["video/mp4", "video/webm", "video/ogg", "video/mkv", "video/quicktime", "video/x-msvideo"].includes(file.type),
      {
        message: "Invalid video file type. Only MP4, WebM, OGG, MKV, MOV, or AVI are allowed.",
      }
    ),
});
export type UploadMovieType = z.infer<typeof uploadMovieSchema>;
const UploadModelProvider = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const {onClose,onOpen,isOpen}=useuploadModel((state)=>state)
    const methods = useForm<UploadMovieType>({
        resolver: zodResolver(uploadMovieSchema),
        defaultValues: {
            title: '',
            description: '',
            genre: '',
            thumbnailUrl:undefined,
            trailerUrl: undefined,
            videoUrl: undefined,
        },
    });
      const { register, handleSubmit, formState: { errors } ,setValue,reset} = methods;
const onSubmit: SubmitHandler<UploadMovieType> = async (data) => {
  const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("genre", data.genre);
    formData.append("thumbnailUrl", data.thumbnailUrl);
    formData.append("trailerUrl", data.trailerUrl);
    formData.append("videoUrl", data.videoUrl);
try {
  setIsUploading(true)
  const xhr = new XMLHttpRequest();
  // Progress tracking
  
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      console.log(`Progress: ${percentComplete}%`);
      setProgress(percentComplete);
    }
  };

  xhr.onload = () => {
    const data = JSON.parse(xhr.responseText);
    if (xhr.status === 200 && data.success) {
      toast.success("Movie Uploaded Successfully!");
      onClose();
      reset();
    } else if (xhr.status === 202) {
      toast.info("Upload started—processing in background. Check back later!");
    } else {
      toast.error(data.message || "Something went wrong!");
    }
    setIsUploading(false);
  };

  xhr.onerror = () => {
    console.error("Network Error: Upload failed!");
    toast.error("Network error—upload failed!");
    setIsUploading(false);
  };

  xhr.onabort = () => {
    console.log("Upload aborted!");
    setIsUploading(false);
  };

  xhr.open("POST", "/api/upload_movie", true);
  xhr.send(formData);
} catch (error) {
  console.log("Error",error)
  toast.error("Something went wrong please try again latter", {theme:"colored"})
}
finally{
  setIsUploading(false)
  reset()
}
}
  return (
    <Modals title='Upload Movie' description='Upload movie details'  isopen={isOpen} onchange={isOpen ? onClose : onOpen}>
      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.2s ease-in-out" }}
            />
          </div>
          <p className="text-center mt-2">{progress}%</p>
        </div>
      )}
    <form onSubmit={handleSubmit(onSubmit)} className='text-white '>
    <Input placeholder='title ' id='title' type="text" disabled={isUploading} {...register('title')} />
    {(errors && <p className={twMerge('text-red-500 text-sm')}>{errors.title?.message}</p>)}
<br></br>

      <Input placeholder='Description' id='description' type='text' disabled={isUploading} {...register('description')} />
      {errors.description && <p className={twMerge('text-red-500 text-sm')}>{errors.description?.message}</p>}
      <br />

      <Input placeholder='Genre' id='genre' type='text' disabled={isUploading} {...register('genre')} />
      {errors.genre && <p className={twMerge('text-red-500 text-sm')}>{errors.genre?.message}</p>}
      <br />
      <div className='pb-1'>
          Select a Thumbnail
        </div>
        <Input placeholder='Thumbnail ' id='thumbnailUrl' type='file' 
        accept='image/jpeg,image/png,image/webp'
         onChange={(e) => {
        const file = e.target.files?.[0];
          if (file) {
            setValue('thumbnailUrl', file);
          }
        }}
         disabled={isUploading} />
            {errors.thumbnailUrl && <p className={twMerge('text-red-500 text-sm')}>{errors.thumbnailUrl?.message}</p>}
            <br />
            
            <div className='pb-1'>
              Trailer Video
            </div>
            <Input placeholder='Trailer Video' id='trailerUrl' type='file' accept='video/mp4,video/x-m4v,video/*'
             onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue('trailerUrl', file);
              }
             }}
             disabled={isUploading} />
            {errors.trailerUrl && <p className={twMerge('text-red-500 text-sm')}>{errors.trailerUrl?.message}</p>}
            <br />
    
            <div className='pb-1'>
              Video File
            </div>
            <Input placeholder='Video File' id='videoUrl' type='file' accept='video/mp4,video/x-m4v,video/*'
             onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
              setValue('videoUrl', file);
              }
             }}
             disabled={isUploading} />
            {errors.videoUrl && <p className={twMerge('text-red-500 text-sm')}>{errors.videoUrl?.message}</p>}
            <br />
        

      <Button disabled={isUploading} type='submit' className='bg-red-600 text-white'>
        Upload
      </Button>
    </form>
</Modals>
  )
}

export default UploadModelProvider