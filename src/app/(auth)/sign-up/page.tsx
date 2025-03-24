"use client";
import React from 'react';
import wallpaper from '@/assets/images/NetflixBackground.jpg';
import NetflixLogo from '@/assets/images/NetflixLogo.png';
import GoogleIcon from '@/assets/images/GoogleIcon.png';
import GithubIcon from '@/assets/images/Githubcon.png';
import Image from 'next/image';
import { Input } from '@/app/Components/Input';
import Button from '@/app/Components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

const signupschema = z.object({
username: z.string().nonempty('Username is required'),
email: z.string().email('Invalid email address'),
password: z.string().min(8, 'Password must be at least 8 characters long'),
})
const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupschema>>({
    resolver: zodResolver(signupschema),
    defaultValues: {
      username: '',
      email:'',
      password: '',
    },
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof signupschema>) => {
    try {
      const response=await axios.post("/api/sign-up",data)
      if (response.data.success) {
        toast.success("Account Created SuccessFully");
    router.replace(`/sign-in`);

    } 
  
    
  }

  catch (error) {
      console.log(error)
        toast.error("Error:Something went wrong");
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center justify-start h-screen w-screen bg-cover bg-no-repeat bg-center 
      "
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${wallpaper.src})`, }}
    >
      <nav className="w-full p-4 flex bg-[rgba(0,0,0,0.8)] md:bg-transparent">
        <span className="flex items-center">
          <Image src={NetflixLogo} alt="logo" width={100} height={100} className="w-26 h-26 md:w-33 md:h-34 lg:h-45 lg:w-46" />
         
        </span>
      </nav>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full md:w-[70%] h-full max-w-md bg-[rgba(0,0,0,0.8)] px-12
        md:px-10  rounded-lg shadow-lg aspect-square md:py-2 "
      >
        <h2 className="text-white text-2xl md:text-3xl font-bold my-4 mr-auto capitalize">Sign Up</h2>
        <div className="w-full mb-4">
          <Input
            type="username"
            placeholder="Enter your name..."
            {...register('username')}
            className='bg-[#5f5d5d] text-white  border-none rounded-md hover:border-none '
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.username?.message}</p>}
        </div>
        <div className="w-full mb-4">
          <Input
            type="email"
            placeholder="Enter your Email address..."
            {...register('email')}
            className='bg-[#5f5d5d] text-white  border-none rounded-md hover:border-none '
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="w-full mb-4">
          <Input
            type="password"
            placeholder="Enter your Password"
            {...register('password')}
            className='bg-[#5f5d5d] text-white  border-none rounded-md hover:border-none '
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-5 bg-[#ff0000] rounded-sm text-white text-2xl font-semibold px-6 py-2">
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
        <div className='flex flex-row items-center justify-center my-5'>
        
        <Image src={GoogleIcon} alt="logo" width={100} height={100} className='rounded-full border-white border-2 w-15 h-15  mx-2 cursor-pointer hover:shadow-2xl hover:shadow-white'  onClick={()=>signIn("google",{callbackUrl:"/app"})}/>
        
        <Image src={GithubIcon} alt="logo" width={100} height={100} className='rounded-full border-white border-2 w-15 h-15 mx-2 cursor-pointer hover:shadow-2xl hover:shadow-white' onClick={()=>signIn("github",{callbackUrl:"/app"})}/>
        </div>
        <p className='text-gray-400'>Already have an account <Link href="/sign-in" className='text-[#ff0000]'>Sign In</Link></p>
      </form>
     
    </div>
  );
};

export default Page;
