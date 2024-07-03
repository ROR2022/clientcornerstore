"use client";
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { MyContext } from '@/context/MyContext'
import dynamic from 'next/dynamic'
const SelectCity = dynamic(() => import('@/components/SignUp/SelectCity'), { ssr: false })
const SelectState = dynamic(() => import('@/components/SignUp/SelectState'), { ssr: false })
const SelectBusinessCategory = dynamic(() => import('@/components/BusinessOwner/Profile/SelectBusinessCategory'), { ssr: false })
import { Formik } from 'formik'
import * as yup from 'yup'
import { Form, Button, Row, Col, InputGroup, Spinner, Nav } from 'react-bootstrap'
import { FaRegUserCircle } from 'react-icons/fa'
import UploadImage from '@/components/UploadImage/UploadImage';
import MainModal from '@/components/MainModal/MainModal';
import Link from 'next/link'
import { editProfileUser } from '@/api/apiUsers';
//import { buffer } from 'stream/consumers';


const initDataFormUser = {
    email: "",
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
    twitter: ''
};

const BOProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUser, setImageUser] = useState<null | string>(null);
    const [stateSelected, setStateSelected] = useState(initDataFormUser.state);
    const [citySelected, setCitySelected] = useState(initDataFormUser.city);
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState(initDataFormUser.businessCategory);
    const [textError, setTextError] = useState('');
    const router = useRouter();
    const { dataLocalStorage, setDataLocalStorage } = useContext(MyContext);
    const [initialFormikValues, setInitialFormikValues] = useState(initDataFormUser);
    /* const initialFormikValues = {
        ...initDataFormUser,
        email: emailUser || 'lupedelgado313@yahoo.com',
    }; */

    useEffect(() => {
        if (!dataLocalStorage || !dataLocalStorage?.access_token) {
            router.push('/error');
        }
        if (dataLocalStorage?.access_token) {
            setImageUser(dataLocalStorage.imageUrl);
            setCitySelected(dataLocalStorage.city);
            setStateSelected(dataLocalStorage.state);
            setInitialFormikValues({
                email: dataLocalStorage.email,
                businessName: dataLocalStorage.businessName,
                businessCategory: dataLocalStorage.businessCategory,
                legalName: dataLocalStorage.legalName,
                slogan: dataLocalStorage.slogan,
                shortDescription: dataLocalStorage.shortDescription,
                longDescription: dataLocalStorage.longDescription,
                phone: dataLocalStorage.phone,
                shortAddress: dataLocalStorage.shortAddress,
                completeAddress: dataLocalStorage.completeAddress,
                city: dataLocalStorage.city,
                state: dataLocalStorage.state,
                country: dataLocalStorage.country,
                postalCode: dataLocalStorage.postalCode,
                webSite: dataLocalStorage.webSite,
                facebook: dataLocalStorage.facebook,
                instagram: dataLocalStorage.instagram,
                twitter: dataLocalStorage.twitter
            });
        }
    }, [])

    useEffect(() => {
        //console.log('stateSelected:...', stateSelected);
    }, [stateSelected])

    useEffect(() => {
        //console.log('initialFormikValues:...', initialFormikValues);
    }, [initialFormikValues])

    const schema = yup.object().shape({
        businessName: yup.string().required(),
        businessCategory: yup.string().required(),
        email: yup.string().email("Invalid email").required().matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Invalid Email Format"
        ),
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
        const userValues = { ...userValuesTemp, roleId: 'businessOwner' };
        //console.log('UserValues',userValues);
        //return;
        try {
            setLoading(true);
            let dataSignup = null;
            //validate if image is not null and not string to create a FormData
            if (imageUser && typeof imageUser !== 'string') {
                dataSignup = new FormData();
                dataSignup.append('file', imageUser);

                for (const key in userValues) {
                    dataSignup.append(key, userValues[key]);
                }
            } else {
                dataSignup = userValues;
            }
            const result = await editProfileUser(dataSignup, dataLocalStorage.access_token);
            //console.log('result editProfile:..',result);

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
                if (result?.error) {
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
                Please save your changes before leaving the page
            </div>
            <h1 className='text-center'>Edit Profile</h1>
            <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
                {!imageUser &&
                    <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                        <FaRegUserCircle className='text-center' style={{ fontSize: '200px' }} />
                        <p className='text-center'>Please upload an image</p>
                    </div>
                }

                <div className='ms-auto me-auto d-block'>
                    <UploadImage setDataImg={setImageUser} dataImg={imageUser} />
                </div>
                {initialFormikValues.email !== '' &&
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSignup}
                        initialValues={initialFormikValues}
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
                                            stateSelected={stateSelected}
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
                                            citySelected={citySelected}
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
                                            setSelectedBusinessCategory={option => {
                                                if (option !== "" && option !== "choose") {
                                                    setFieldValue('businessCategory', option)
                                                    setSelectedBusinessCategory(option)
                                                }
                                            }}
                                        />
                                        {/* <Form.Control
                                            type="text"
                                            placeholder="Business Category"
                                            name="businessCategory"
                                            value={values.businessCategory}
                                            onChange={handleChange}
                                            isValid={touched.businessCategory && !errors.businessCategory}
                                            isInvalid={!!errors.businessCategory}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.businessCategory}
                                        </Form.Control.Feedback> */}
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

                                <div className='d-flex flex-column align-items-center gap-2 my-3'>
                                    <Button type="submit" variant='outline-success'>
                                        {loading && <Spinner animation="border" role="status" size="sm" />}
                                        {!loading && <span>Save Changes</span>}
                                    </Button>
                                    <Link href="/">
                                        <Button type="button" className='btn btn-light'>Cancel?</Button>
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>

                }
            </div>
            {showModal && success && <MainModal dataModal={{ showModal, setShowModal, title: 'Success', text: 'Profile has been edited successfully', severity: 'success' }} />}
            {showModal && !success && <MainModal dataModal={{ showModal, setShowModal, title: 'Error', text: textError || 'Profile Edition Failed', severity: 'danger' }} />}

        </div >
    )
}

export default BOProfile