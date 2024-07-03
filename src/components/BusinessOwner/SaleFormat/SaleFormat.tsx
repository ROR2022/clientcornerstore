"use client";
import  { useEffect, useState } from 'react'
import NavBarSales from './NavBarSales'
//import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic';
const FormSaleBranch = dynamic(() => import('./FormSaleBranch'), { ssr: false });
//import FormSaleBranch from './FormSaleBranch'

const SaleFormat = () => {
    //const searchParams = useSearchParams();
    //const emailBusinessOwner = searchParams.get("businessOwner");
    const [emailBusinessOwner, setEmailBusinessOwner] = useState('');
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setEmailBusinessOwner(searchParams.get("businessOwner")||'');
    },[])
    useEffect(() => {
        //console.log('emailBusinessOwner:..', emailBusinessOwner);
    },[emailBusinessOwner])



  return (
    <div>
        <NavBarSales />
        <FormSaleBranch />
        
    </div>
  )
}

export default SaleFormat