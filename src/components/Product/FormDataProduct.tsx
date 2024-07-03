import {FC, useEffect} from 'react'
import { Formik } from 'formik';
import { Col, Form, Row, Button, InputGroup, Spinner, Modal } from 'react-bootstrap';
import Link from 'next/link';

interface FormDataProductProps {
    schema: any;
    handleSaveProduct: (values:any)=> any;
    initialFormikValues: any;
    loading: boolean;
    dataIdProduct: string;
    }

const FormDataProduct: FC<FormDataProductProps> = ({
    schema,
    handleSaveProduct,
    initialFormikValues,
    loading,
    dataIdProduct
}) => {

    useEffect(() => {
        console.log('initialFormikValues(dentro del formulario):..', initialFormikValues); 
    }, [initialFormikValues]);
    //const dataFormikValues={...initialFormikValues}

  return (
    <>

    
        <Formik
          validationSchema={schema}
          onSubmit={handleSaveProduct}
          initialValues={initialFormikValues}
          enableReinitialize={true}
        >
          {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                  {typeof errors.name === 'string' ? errors.name : 'An error occurred'}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                    {typeof errors.price === 'string' ? errors.price : 'An error occurred'}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={touched.description && !!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                  {typeof errors.description === 'string' ? errors.description : 'An error occurred'}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="stock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                    isInvalid={touched.stock && !!errors.stock}
                  />
                  <Form.Control.Feedback type="invalid">
                  {typeof errors.stock === 'string' ? errors.stock : 'An error occurred'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    isInvalid={touched.category && !!errors.category}
                  />
                  <Form.Control.Feedback type="invalid">
                  {typeof errors.category === 'string' ? errors.category : 'An error occurred'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>


              <div className='d-flex flex-column align-items-center gap-2 my-3'>
                <Button type="submit" variant='outline-success'>
                  {loading && <Spinner animation="border" role="status" size="sm" />}
                  {!loading && <span>
                    {dataIdProduct !== '' ? 'Update' : 'Save'}
                  </span>}
                </Button>
                <Link href="/">
                  <Button type="button" className='btn btn-light'>Cancel?</Button>
                </Link>
              </div>

            </Form>
          )}
        </Formik>
    
    
        </>
  )
}

export default FormDataProduct