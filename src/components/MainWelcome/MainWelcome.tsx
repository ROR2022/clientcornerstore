"use client";
import {FC} from 'react'
import { 
    mainAppFeatures, 
    mainAppFeaturesDescription, 
    mainAppKeywords, 
    mainAppLongDescription, 
    mainAppShortDescription, mainAppTitle } from '../dataEnv';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const MainWelcome:FC<any> = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' });
  return (
    <div>
        <h1 className='fs-3 text-center alert alert-info'>
            Welcome to the {mainAppTitle}
            <span 
            className='d-block fs-6 mt-2'>
                {mainAppShortDescription}
            </span>
        </h1>
        <Image src='/logoShop.png' 
        alt='Logo' width={200} height={200} 
        style={{marginTop: '-50px', marginBottom: '-30px'}}
        className='d-block me-auto ms-auto' />
        <div 
        style={{width:isDesktopOrLaptop?'50%':'75%'}}
        className='card bg-light p-2 my-3 me-auto ms-auto'>
            <p className='fs-5 text-center mt-3 text-bg-secondary'>
                {mainAppLongDescription}</p>
            <p 
            className='my-5'
            style={{textAlign:'justify'}}>
                {mainAppFeaturesDescription}
                <span className='d-block mt-2'>
                {mainAppFeatures}
                </span>
            </p>
            <p className='fs-4 text-bg-secondary text-center mb-3'>
                keywords: {mainAppKeywords}
            </p>
        </div>
    </div>
  )
}

export default MainWelcome