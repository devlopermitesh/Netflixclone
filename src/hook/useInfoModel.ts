"use client"
import {create} from "zustand"

interface useinforType{
    MovieId?:string
    isopen:boolean
    OnOpen:(MovieId:string)=>void,
    OnClose:()=>void
}

const useInfoModal=create<useinforType>((set)=>({
    MovieId:undefined,
    isopen:false,
    OnClose:()=>set({isopen:false,MovieId:undefined}),
    OnOpen:(MovieId:string)=>set({isopen:true,MovieId})
}))

export default useInfoModal;