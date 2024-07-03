"use client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { loginUser } from "@/api/apiUsers";
import { Spinner } from "react-bootstrap";
import MainModal from "../MainModal/MainModal";
import { useContext } from "react";
import { MyContext } from "@/context/MyContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const initDataFormUser = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const { setDataLocalStorage } = useContext(MyContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailBusinessOwner = searchParams.get("businessOwner");
  //console.log('dataContext:..',dataContext);

  //const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email")
      .required()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Invalid email format"
      ),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character !@#%&"
      ),
  });

  const handleLogin = async (values: any) => {
    //console.log("isEmployee:..", isEmployee);
    //return;
    try {
      setLoading(true);
      const response = await loginUser(values);
      //console.log(response);
      //console.log('status:...',response.response.status);
      if (response.access_token) {
        setSuccess(true);
        setShowModal(true);
        setDataLocalStorage({
          ...response,
        });
        router.push(`/?businessOwner=${emailBusinessOwner}`);
      } else {
        setShowModal(true);
        setSuccess(false);
        setError(response.error || response.response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(`Error in handleLogin: ${error}`);
      setLoading(false);
      setShowModal(true);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1 className="text-center my-3">SIGN IN</h1>

      <div className="card me-auto ms-auto py-2 px-4 mb-3 w-75 ">
        <Formik
          validationSchema={schema}
          onSubmit={handleLogin}
          initialValues={initDataFormUser}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormikUseremail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormikPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="passsword"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3 d-none">
                <Form.Group as={Col} controlId="validationFormikEmployee">
                  <Form.Label>Employee</Form.Label>
                  <Form.Check 
                  type="checkbox" 
                  label="Employee" 
                  name="isEmployee"
                  checked={isEmployee}
                  onChange={(e) => setIsEmployee(prev=>!prev)}
                  />
                </Form.Group>
              </Row>

              <div className="d-flex flex-column align-items-center gap-2">
                <Link href="/updatePassword">
                  <Button type="button" className="btn btn-light">
                    Forgot Password ??
                  </Button>
                </Link>

                <Button type="submit" variant="outline-success">
                  {loading && <Spinner animation="border" role="status" />}
                  {!loading && <span>Login</span>}
                </Button>
                <Link href="/signup">
                  <Button type="button" className="btn btn-light">
                    Create / SignUP
                  </Button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {showModal && success && (
        <MainModal
          dataModal={{
            showModal,
            setShowModal,
            title: "Success",
            text: "Login Success",
            severity: "success",
          }}
        />
      )}
      {showModal && !success && (
        <MainModal
          dataModal={{
            showModal,
            setShowModal,
            title: "Error",
            text: `Login Error ${error}`,
            severity: "danger",
          }}
        />
      )}
    </div>
  );
};

export default SignIn;
