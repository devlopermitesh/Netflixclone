"use client"

import React, { useEffect } from 'react'
import UploadModelProvider from './UploadModelProvider'

const ModalProvider = () => {
    const [isMounted,setIsMounted]=React.useState(true)
useEffect(()=>setIsMounted(true),[])

    if(!isMounted) return null

  return (<>
       <UploadModelProvider/>
       </>
  )
}

export default ModalProvider