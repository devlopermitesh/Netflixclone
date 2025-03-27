'use client';

import InfoModel from '@/app/Components/InfoModel';
import useInfoModal from '@/hook/useInfoModel';
import React from 'react';



const Information: React.FC = () => {
      const {isopen,OnClose}=useInfoModal()
    
    return (
        <InfoModel visible={isopen} onclose={OnClose}/>

    );
};

export default Information;