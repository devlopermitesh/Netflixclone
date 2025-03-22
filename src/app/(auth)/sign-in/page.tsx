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

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log('Login Data:', data);
    // TODO: Add actual login functionality here
  };

  return (
    <div
      className="absolute flex flex-col items-center justify-start h-screen w-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${wallpaper.src})`, }}
    >
      <nav className="w-full p-4 flex bg-[rgba(0,0,0,0.8)] md:bg-transparent">
        <span className="flex items-center">
          <Image src={NetflixLogo} alt="logo" width={100} height={100} className="w-20 h-20 md:w-30 md:h-30 lg:h-40 lg:w-40" />
         
        </span>
      </nav>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full md:w-[70%] h-full max-w-md bg-[rgba(0,0,0,0.8)] px-12
        md:px-10  rounded-lg shadow-lg aspect-square md:py-2 "
      >
        <h2 className="text-white text-2xl md:text-3xl font-bold my-4 mr-auto capitalize">Sign In</h2>

        <div className="w-full mb-4">
          <Input
            type="email"
            placeholder="Enter your Email address..."
            {...register('email')}
            className='bg-[#5f5d5d] text-white  border-none rounded-md hover:border-none focus:ring-0 '
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
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <div className='flex flex-row items-center justify-center my-5'>
        
        <Image src={GoogleIcon} alt="logo" width={100} height={100} className='rounded-full border-white border-2 w-15 h-15  mx-2 cursor-pointer hover:shadow-2xl hover:shadow-white'/>
        
     <Image src={GithubIcon} alt="logo" width={100} height={100} className='rounded-full border-white border-2 w-15 h-15 mx-2 cursor-pointer hover:shadow-2xl hover:shadow-white'/>
        </div>
        <p className='text-gray-400'>First Time using TinyToons? <Link href="/sign-up" className='text-[#ff0000b7]'>Sign Up</Link></p>
      </form>
     
    </div>
  );
};

export default Page;
