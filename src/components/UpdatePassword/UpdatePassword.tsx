"use client";

import { useEffect, useState, FC } from 'react'
import { Col, Form, Row, Button, InputGroup, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { updatePassword } from '@/api/apiUsers';
import MainModal from '../MainModal/MainModal';
import { Nav } from 'react-bootstrap';
import UploadImage from '@/components/UploadImage/UploadImage';
import { FaRegUserCircle } from "react-icons/fa";
//import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
import Link from 'next/link';

const initDataFormUser = {
    email: "",
    password: "",
    repeatedPassword: "",
};

interface UpdatePasswordProps {
    emailUser: string;
}

const UpdatePassword: FC<UpdatePasswordProps> = ({emailUser}) => {
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUser, setImageUser] = useState(null);
    const [dataEmailUser, setDataEmailUser] = useState(emailUser);
    const router = useRouter();
    const { dataLocalStorage, setDataLocalStorage } = useContext(MyContext);

    useEffect(() => {
        if (dataEmailUser===''||dataEmailUser===undefined||dataEmailUser===null) {
            setDataEmailUser('lupedelgado313@yahoo.com');
        }
    }, [dataEmailUser]);

    const schema = yup.object().shape({
        email: yup.string().email("Correo Invalido").matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Invalid Email Format"
        ),
        password: yup.string().required().min(8).matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%&*+._¿?¡])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        repeatedPassword: yup.string().required("is required").oneOf([yup.ref('password')], 'Passwords must match'),
    });
    const handleSignup = async (values: any) => {
        const { repeatedPassword, ...userValues } = values;
        //console.log(chismosoValues);
        //return;
        try {
            setLoading(true);
            if(userValues.email===''||userValues.email===undefined||userValues.email===null) {
                userValues.email= dataEmailUser;
            }
            console.log('userValues:..',userValues);
            const result = await updatePassword(userValues);
            console.log('result updatePassword:..',result);
            
            if (result?.email) {
                setSuccess(true);
                setShowModal(true);
                setDataLocalStorage(result);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            }
            else {
                setSuccess(false);
                setShowModal(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setSuccess(false);
            setShowModal(true);
            setLoading(false);
        }
    }
    return (
        <div>
            <h1 className='text-center'>UPDATE PASSWORD</h1>
            <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
                
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSignup}
                    initialValues={initDataFormUser}
                >
                    {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                            <OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip id="tooltip-bottom">
                    {dataEmailUser}
                </Tooltip>
            }
        >
                                <Form.Group as={Col} md="12" controlId="validationFormikUsername">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            aria-describedby="inputGroupPrepend"
                                            name="email"
                                            value={dataEmailUser}
                                            onChange={handleChange}
                                            isValid={true}
                                            //isValid={touched.email && !errors.email}
                                            //isInvalid={!!errors.email}
                                            disabled={true}
                                            
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                </OverlayTrigger>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik08">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik09">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="repeatedPassword"
                                        value={values.repeatedPassword}
                                        onChange={handleChange}
                                        isValid={touched.repeatedPassword && !errors.repeatedPassword}
                                        isInvalid={!!errors.repeatedPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.repeatedPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>



                            

                            <div className='d-flex flex-column gap-2 align-items-center my-3'>
                                <Button type="submit" variant='outline-success'>
                                    {loading && <Spinner animation="border" role="status" size="sm" />}
                                    {!loading && <span>Update Password</span>}
                                </Button>
                                <Link href="/">
                                    <Button type="button" className='btn btn-light'>Cancel?</Button>
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {showModal && success && <MainModal dataModal={{ showModal, setShowModal, title: 'Success', text: 'Updated Password Successfully', severity: 'success' }} />}
            {showModal && !success && <MainModal dataModal={{ showModal, setShowModal, title: 'Error', text: 'Updated Password Failed', severity: 'danger' }} />}

        </div>
    )
}

export default UpdatePassword