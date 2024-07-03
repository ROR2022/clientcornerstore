"use client";
import {useState, FC} from 'react'
import SignUpClient from './SignUpClient'
import ConfirmEmail from '../ConfirmEmail/ConfirmEmail'
import { useSearchParams } from 'next/navigation';




const PreSignUpClient = () => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [emailUser, setEmailUser] = useState('')
    const searchParams = useSearchParams();
    const emailBusinessOwner = searchParams.get('businessOwner') || '';
  return (
    <div>
        {isConfirmed ? <SignUpClient emailUser={emailUser} emailBusinessOwner={emailBusinessOwner} /> : <ConfirmEmail isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} setEmailUser={setEmailUser} />}
    </div>
  )
}

export default PreSignUpClient