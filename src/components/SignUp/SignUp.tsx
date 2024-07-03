"use client";

import { useEffect, useState, FC, use } from 'react'
import { Col, Form, Row, Button, InputGroup, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { registerUser } from '@/api/apiUsers';
import MainModal from '../MainModal/MainModal';
import { Nav } from 'react-bootstrap';
import UploadImage from '@/components/UploadImage/UploadImage';
import { FaRegUserCircle } from "react-icons/fa";
//import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
//import SelectCity from './SelectCity';
//import SelectState from './SelectState';
import dynamic from 'next/dynamic'
const SelectCity = dynamic(() => import('@/components/SignUp/SelectCity'), { ssr: false })
const SelectState = dynamic(() => import('@/components/SignUp/SelectState'), { ssr: false })
const SelectBusinessCategory = dynamic(() => import('@/components/BusinessOwner/Profile/SelectBusinessCategory'), { ssr: false })
import Link from 'next/link';
//import { useSearchParams } from 'next/navigation';



const initDataFormUser = {
    email: "",
    password: "",
    repeatedPassword: "",
    businessName: "",
    businessCategory: "",
    legalName: "",
    slogan: "",
    shortDescription: "",
    longDescription: "",
    phone: "",
    shortAddress: "",
    completeAddress: "",
    city: "",
    state: "",
    country: "México",
    postalCode: "",
    webSite: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tyc: false,
};

interface SignUpProps {
    emailUser: string;
}

const SignUp: FC<SignUpProps> = ({ emailUser }) => {
    //const { Formik } = formik;
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUser, setImageUser] = useState(null);
    const [stateSelected, setStateSelected] = useState(initDataFormUser.state);
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState(initDataFormUser.businessCategory);
    const [textError, setTextError] = useState('');
    const router = useRouter();
    const { dataLocalStorage, setDataLocalStorage } = useContext(MyContext);
    const initialFormikValues = {
        ...initDataFormUser,
        email: emailUser || 'lupedelgado313@yahoo.com',
    };
    //const searchParams = useSearchParams();
    //const userRoleId = searchParams.get('user');
    const [userRoleId, setUserRoleId] = useState('');

    useEffect(() => {
        //console.log('stateSelected:...', stateSelected);
        const searchParams = new URLSearchParams(window.location.search);
        setUserRoleId(searchParams.get('user') || '');
        //console.log('userRoleId:...', userRoleId);
    }, [])

    useEffect(() => {
        //console.log('stateSelected:...', stateSelected);
    }, [stateSelected])

    const schema = yup.object().shape({
        businessName: yup.string().required(),
        businessCategory: yup.string().required(),
        email: yup.string().email("Invalid email").required().matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Invalid Email Format"
        ),
        password: yup.string().required().min(8).matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%&*+._¿?¡])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character -!@#$%&*+._¿?¡"
        ),
        repeatedPassword: yup.string().required("is required").oneOf([yup.ref('password')], 'Passwords must match'),
        tyc: yup.bool().required().oneOf([true], 'T&C must be accepted'),
        legalName: yup.string(),
        phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
        postalCode: yup.string().matches(/^[0-9]{5}$/, 'Postal code must be 5 digits'),
        shortDescription: yup.string(),
        slogan: yup.string(),
        longDescription: yup.string(),
        shortAddress: yup.string(),
        completeAddress: yup.string(),
        city: yup.string(),
        state: yup.string(),
        country: yup.string(),
        webSite: yup.string(),
        facebook: yup.string(),
        instagram: yup.string(),
        twitter: yup.string()
    });
    const handleSignup = async (values: any) => {
        //console.log('Values:..', values);
        const { repeatedPassword, tyc, ...userValuesTemp } = values;
        //console.log('UserValues',userValuesTemp);

        const userValues= {...userValuesTemp, roleId:(userRoleId&&userRoleId!=='')?userRoleId:'businessOwner'};
        console.log('UserValues',userValues);
        //return;
        try {
            setLoading(true);
            let dataSignup = null;
            if (imageUser) {
                dataSignup = new FormData();
                dataSignup.append('file', imageUser);
                for (const key in userValues) {
                    dataSignup.append(key, userValues[key]);
                }
            } else {
                dataSignup = userValues;
            }
            const result = await registerUser(dataSignup);
            console.log('result signUp:..',result);

            if (result?.access_token) {
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
                if(result?.error){
                    setTextError(result.error);
                }
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setSuccess(false);
            setShowModal(true);
            setLoading(false);
        }
    }

    const handleChangeState = (option: string) => {
        setStateSelected(option);
        //console.log('State selected:..', option)
    }

    return (
        <div>
            <div className='alert alert-info text-center my-2 fs-6'>
                Please fill the form to register with required fields
            </div>
            <h1 className='text-center'>SIGN UP</h1>
            <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
                {!imageUser &&
                    <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                        <FaRegUserCircle className='text-center' style={{ fontSize: '200px' }} />
                        <p className='text-center'>Please upload an image</p>
                    </div>
                }

                <div className='ms-auto me-auto d-block'>
                    <UploadImage setDataImg={setImageUser} />
                </div>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSignup}
                    initialValues= {initialFormikValues}
                >
                {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3 NAMES">
                            <Form.Group as={Col} md="4" controlId="validationFormik01">
                                <Form.Label>Business Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="businessName"
                                    value={values.businessName}
                                    onChange={handleChange}
                                    isValid={touched.businessName && !errors.businessName}
                                    isInvalid={!!errors.businessName}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.businessName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik02">
                                <Form.Label>Legal Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="legalName"
                                    value={values.legalName}
                                    onChange={handleChange}
                                    isValid={touched.legalName && !errors.legalName}
                                    isInvalid={!!errors.legalName}
                                />

                                <Form.Control.Feedback type='invalid'>
                                    {errors.legalName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                        disabled={true}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3 DESCRIPTION'>   
                            <Form.Group as={Col} md="4" controlId="validationFormik03">
                                <Form.Label>Slogan</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Slogan"
                                    name="slogan"
                                    value={values.slogan}
                                    onChange={handleChange}
                                    isValid={touched.slogan && !errors.slogan}
                                    isInvalid={!!errors.slogan}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.slogan}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik04">
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Short Description"
                                    name="shortDescription"
                                    value={values.shortDescription}
                                    onChange={handleChange}
                                    isValid={touched.shortDescription && !errors.shortDescription}
                                    isInvalid={!!errors.shortDescription}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.shortDescription}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik05">
                                <Form.Label>Long Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Long Description"
                                    name="longDescription"
                                    value={values.longDescription}
                                    onChange={handleChange}
                                    isValid={touched.longDescription && !errors.longDescription}
                                    isInvalid={!!errors.longDescription}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.longDescription}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 PASSWORDS">
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
                        
                        <Row className="mb-3 ADDRESS">
                            <Form.Group as={Col} md="4" controlId="validationFormik10">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isValid={touched.phone && !errors.phone}
                                    isInvalid={!!errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik11">
                                <Form.Label>Short Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Short Address"
                                    name="shortAddress"
                                    value={values.shortAddress}
                                    onChange={handleChange}
                                    isValid={touched.shortAddress && !errors.shortAddress}
                                    isInvalid={!!errors.shortAddress}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.shortAddress}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik12">
                                <Form.Label>Complete Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Complete Address"
                                    name="completeAddress"
                                    value={values.completeAddress}
                                    onChange={handleChange}
                                    isValid={touched.completeAddress && !errors.completeAddress}
                                    isInvalid={!!errors.completeAddress}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.completeAddress}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 CITY">
                            <Form.Group as={Col} md="4" controlId="validationFormik14">
                                <Form.Label>State</Form.Label>
                                <SelectState
                                    handleChangeState={option => {
                                        if (option !== "" && option !== "choose") {
                                            setFieldValue('state', option)
                                            handleChangeState(option)
                                            
                                        }
                                    }
                                    }
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik13">
                                <Form.Label>
                                    City
                                    {(stateSelected === '' || stateSelected === 'choose') &&
                                        <span style={{ fontSize: '12px' }} className='ps-2 text-danger'>
                                            First Select State Please
                                        </span>
                                    }
                                </Form.Label>

                                <SelectCity
                                    state={stateSelected}
                                    handleChangeCity={option => {
                                        if (option !== "" && option !== "choose") {
                                            setFieldValue('city', option)
                                            
                                        }
                                    }
                                    }
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik13">
                                <Form.Label>Business Category</Form.Label>
                                <SelectBusinessCategory
                                    selectedBusinessCategory={selectedBusinessCategory}
                                    setSelectedBusinessCategory={(businessCategory) => {
                                        setFieldValue('businessCategory', businessCategory)
                                        setSelectedBusinessCategory(businessCategory)
                                    }}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 COUNTRY" >
                            <Form.Group as={Col} md="4" controlId="validationFormik15">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Country"
                                    name="country"
                                    value='México' 
                                    disabled={true}
                                    isValid={touched.country && !errors.country}
                                    isInvalid={!!errors.country}
                                />
                                {/* 
                                {values.country}
                                onChange={handleChange}
                                
                                <Form.Control.Feedback type="invalid">
                                    {errors.country}
                                </Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik16">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Postal Code"
                                    name="postalCode"
                                    value={values.postalCode}
                                    onChange={handleChange}
                                    isValid={touched.postalCode && !errors.postalCode}
                                    isInvalid={!!errors.postalCode}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.postalCode}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik17">
                                <Form.Label>Web Site</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Web Site"
                                    name="webSite"
                                    value={values.webSite}
                                    onChange={handleChange}
                                    isValid={touched.webSite && !errors.webSite}
                                    isInvalid={!!errors.webSite}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.webSite}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 FACEBOOK">
                            <Form.Group as={Col} md="4" controlId="validationFormik18">
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Facebook"
                                    name="facebook"
                                    value={values.facebook}
                                    onChange={handleChange}
                                    isValid={touched.facebook && !errors.facebook}
                                    isInvalid={!!errors.facebook}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.facebook}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik19">
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Instagram"
                                    name="instagram"
                                    value={values.instagram}
                                    onChange={handleChange}
                                    isValid={touched.instagram && !errors.instagram}
                                    isInvalid={!!errors.instagram}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.instagram}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik20">
                                <Form.Label>Twitter</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Twitter"
                                    name="twitter"
                                    value={values.twitter}
                                    onChange={handleChange}
                                    isValid={touched.twitter && !errors.twitter}
                                    isInvalid={!!errors.twitter}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.twitter}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 TYC">
                        <Form.Group >
                            <Form.Check
                                required
                                name="tyc"
                                label="Agree to terms and conditions"
                                onChange={handleChange}
                                isValid={touched.tyc && !errors.tyc}
                                isInvalid={!!errors.tyc}
                                feedback={errors.tyc}
                                feedbackType="invalid"
                                id="validationFormik0"
                            />
                        </Form.Group>
                        <Link href="/tyc">
                            Terms and Conditions
                        </Link>
                        <Form.Control.Feedback type="invalid">
                            {errors.tyc}
                        </Form.Control.Feedback>
                        </Row>

                        <div className='d-flex flex-column align-items-center gap-2 my-3'>
                            <Button type="submit" variant='outline-success'>
                                {loading && <Spinner animation="border" role="status" size="sm" />}
                                {!loading && <span>Sign Up</span>}
                            </Button>
                            <Link href="/signin">
                                <Button type="button" className='btn btn-light'>Already Registered?</Button>
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
            { showModal && success && <MainModal dataModal={{ showModal, setShowModal, title: 'Success', text: 'User Registered Successfully', severity: 'success' }} /> }
    { showModal && !success && <MainModal dataModal={{ showModal, setShowModal, title: 'Error', text: textError || 'User Registration Failed', severity: 'danger' }} /> }

        </div >
    )
}

export default SignUp


