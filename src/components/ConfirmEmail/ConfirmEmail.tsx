"use client";
import { useState, FC } from 'react'
import { sendConfirmCode } from '@/api/apiMailer'
import { useMediaQuery } from 'react-responsive';
import { Spinner } from 'react-bootstrap';

interface ConfirmEmailProps {
    isConfirmed: boolean;
    setIsConfirmed: (value: boolean) => void;
    setEmailUser: (value: string) => void;
}

//este componente tiene como finalidad confirmar el email del usuario
//para que pueda acceder a la aplicacion sele debe enviar un email con un codigo de acceso


const ConfirmEmail: FC<ConfirmEmailProps> = ({ isConfirmed, setIsConfirmed, setEmailUser }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [errorCode, setErrorCode] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [isConfirmed, setIsConfirmed] = useState(false);
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'code') setCode(value);
    }

    const handleConfirmCode = () => {
        if (confirmCode === code) {
            console.log('Email Confirmed');
            setIsConfirmed(true);
            setEmailUser(email);
            setErrorCode(false);
        } else {
            console.log('Invalid Code');
            setIsConfirmed(false);
            setErrorCode(true)
        }
    }

    const handleSendConfirmCode = async () => {
        try {
            if (!validateEmail()) {
                setInvalidEmail(true);
                return;
            } else {
                setInvalidEmail(false);
            }
            setLoading(true);
            const response = await sendConfirmCode(email);
            //console.log('response:...',response);
            setLoading(false);
            if (response.error) {
                console.log('Error:...', response.error);
                alert('Error: ' + response.error);
                return;
            }
            setConfirmCode(String(response.code));
            console.log('resonseCode:...', response);
        } catch (error) {
            console.log(error);
            alert('Error: ' + error);
        }
    }

    const validateEmail = () => {
        // eslint-disable-next-line no-useless-escape
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }



    return (
        <div
            style={{ width: isDesktopOrLaptop ? '50%' : '75%' }}
            className='card bg-light me-auto ms-auto p-2 my-4'>
            <h6 className='alert alert-info text-center fs-6'>
                Please Confirm Email to Continue</h6>
            {confirmCode === '' &&
                <>
                    <input
                        onChange={handleChange}
                        className='form-control'
                        name='email' type="text" placeholder="Email" />

                    {invalidEmail && <h6 className='alert alert-danger text-danger my-2'>Invalid Email</h6>}

                    <button
                        type='button'
                        className='btn btn-primary my-3'
                        onClick={handleSendConfirmCode}
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> :
                            'Send Code'
                        }

                    </button>
                </>
            }
            {confirmCode !== '' &&
                <>
                    <input
                        onChange={handleChange}
                        className='form-control my-3' name='code' type="text" placeholder="Code" />
                    <button
                        type='button'
                        className='btn btn-primary my-3'
                        onClick={handleConfirmCode}
                    >Confirm</button>
                </>
            }

            {isConfirmed && <h4 className='alert alert-success'>Email Confirmed</h4>}
            {errorCode && <h6 className='alert alert-danger text-danger my-2'>Invalid Code</h6>}
        </div>
    )
}

export default ConfirmEmail