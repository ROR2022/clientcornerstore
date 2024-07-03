"use client";
import React from 'react'
import dynamic from 'next/dynamic';
const ShowSales = dynamic(() => import('@/components/Sales/ShowSales/ShowSales'), { ssr: false });
//import ShowSales from '@/components/Sales/ShowSales/ShowSales';

const page = () => {
  return (
    <div>
        <ShowSales />
    </div>
  )
}

export default page