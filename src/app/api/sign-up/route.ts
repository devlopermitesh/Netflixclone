import bcryptpass from "@/Helpers/bcryptpass";
import cryptoUtils from "@/Helpers/cryptoUtils";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb"
export async function POST(req: NextRequest,res:NextResponse) {
    try {
        const { username, email, password } = await req.json();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        if (!username || !email || !password) {
            throw new Error("All fields (username, email, password) are required.");
        }
    
        //search for user email
        const user=await prismadb?.user.findUnique({where:{
            email:email
        }})
      //if user already exit and try to re-register
      if(user){
        throw new Error("User Email is Already Exits please login!")
      }

      const hashedPassword=await bcryptpass.hashPassword(password)
 //create use
 const newuser=await prismadb?.user.create({
    data:{
        name: username,
        email,
        hashedPassword,
        emailVerified:new Date(), 
        verified: true,
    }
 })
console.log("New user created")
return NextResponse.json({success:true,message:"user Created Successfully"},{status:200})
    } catch (error: unknown) {
        console.error("Error during user registration:", error);

        if (error instanceof Error) {
            if (error.message.includes("email_1 dup key")) {
                return NextResponse.json(
                    { success: false, message: "User already exists with the same email " },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { success: false, message: error.message || "Something went wrong during registration." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Unknown error occurred during registration." },
            { status: 500 }
        );
    
}


}
