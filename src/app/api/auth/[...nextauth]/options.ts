import {NextAuthOptions} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import bcryptpass from "@/Helpers/bcryptpass";
import prismadb from "../../../../../lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const Authoptions:NextAuthOptions={
    providers:[
        Credentials({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "Password", type: "password" }
              },

              async authorize(credentials):Promise<any>{;

                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email or Password is Requeired")
                }
                try {
                  const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                  
                  })

                    if(!user || !user.hashedPassword){

                        throw new Error("no user found with this username");
                    }
                    if(!user.verified){
                        throw new Error("please verify your accound first!")

                    }
                 
                    const isPasswordCorrect = await bcryptpass.comparePassword(credentials.password, user.hashedPassword);
                    if(isPasswordCorrect){
                        const { hashedPassword, ...filteredUser } = user;
                        return filteredUser;
                    }
                    else{
                        throw new Error("Incorrrect password")
                    }

                } catch (err:any) {
                    throw new Error(err)
                    
                }


              }
        }),
           // Google Provider (for Google login)
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
            params: {
              scope: "openid email profile" // ✅ Ensure 'profile' is included
            }
          }
       
      }),
      GithubProvider({
        clientId: process.env.Github_CLIENT_ID!,
        clientSecret: process.env.Github_CLIENT_SECRET!,   
        authorization: {
  url: "https://github.com/login/oauth/authorize",
  params: {
    scope: "read:user user:email"
  }
}
     
       
      }),
    ],
 
    adapter: PrismaAdapter(prismadb), 

    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy: "database", 
    },
    secret:process.env.NextAUTH_SECRET
}