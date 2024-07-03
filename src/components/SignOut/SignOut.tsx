"use client";
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { MyContext } from '@/context/MyContext'
import { useRouter } from 'next/navigation';
import {Nav} from 'react-bootstrap'

const SignOut = () => {
    const { dataLocalStorage, setDataLocalStorage, initDataStorage } = useContext(MyContext);
    const router = useRouter();

    useEffect(() => {
        if (dataLocalStorage.email === '') {
            router.push('/');
        }
    }, [dataLocalStorage]);

    const handleLogout = async () => {
        setDataLocalStorage(initDataStorage);
    }
  return (
    <div className='card ms-auto me-auto w-75 m-2 p-2'>
        <h1 className='text-center'>Sign Out</h1>
        <p className='alert alert-danger text-center'>Are you sure you want to sign out?</p>
        <div className='d-flex justify-content-center align-items-center gap-4'>
        <Link href='/'>
        <button className='btn btn-outline-danger' onClick={handleLogout}>Yes</button>
        </Link>
        <Link href="/">
            <button className='btn btn-outline-success'>No</button>
            
            </Link>
        </div>
    </div>
  )
}

export default SignOut