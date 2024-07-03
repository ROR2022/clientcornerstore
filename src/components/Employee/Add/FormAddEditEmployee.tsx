import { FC, useEffect, useState } from "react";
import { Formik } from "formik";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import Link from "next/link";
import SelectMultipleBranches from "./SelectMultipleBranches";
import SelectMultipleRoles from "./SelectMultipleRoles";
//importamos los iconos de mostrar y ocultar contraseña de react-icons
import { BsEyeSlash, BsEye } from "react-icons/bs";
/* import dynamic from 'next/dynamic'
const SelectCity = dynamic(() => import('@/components/SignUp/SelectCity'), {
  ssr: false,
});
const SelectState = dynamic(() => import('@/components/SignUp/SelectState'), {
  ssr: false,
}); */

interface FormDataEmployeeProps {
  schema: any;
  handleSaveEmployee: (values: any) => any;
  initialFormikValues: any;
  setInitialFormikValues: (values: any) => void;
  loading: boolean;
  dataIdEmployee: string;
  stateSelected: string;
  setStateSelected: (state: string) => void;
}

const FormAddEditEmployee: FC<FormDataEmployeeProps> = ({
  schema,
  handleSaveEmployee,
  initialFormikValues,
  setInitialFormikValues,
  loading,
  dataIdEmployee,
  stateSelected,
  setStateSelected,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  useEffect(() => {
    console.log(
      "initialFormikValues(dentro del formulario):..",
      initialFormikValues
    );
  }, [initialFormikValues]);

  useEffect(() => {}, [dataIdEmployee]);
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSaveEmployee}
      initialValues={initialFormikValues}
      enableReinitialize={true}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3 NAMES">
            <Form.Group as={Col} md="6" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={values.businessName}
                onChange={handleChange}
                isInvalid={touched.businessName && !!errors.businessName}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.businessName === "string"
                  ? errors.businessName
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="price">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="legalName"
                value={values.legalName}
                onChange={handleChange}
                isInvalid={touched.legalName && !!errors.legalName}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.legalName === "string"
                  ? errors.legalName
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 PASSWORDS">
            <Form.Group as={Col} md="6" controlId="validationFormik08">
              <Form.Label>
                {dataIdEmployee !== "" ? "New Password" : "Password"}
              
                </Form.Label>
              <Form.Text className="text-danger opacity-75 d-block">
                {dataIdEmployee !== "" ? "Leave empty if you don't want to change the password" : ""}
              </Form.Text>
              <div className="d-flex gap-1">
              <Form.Control
                type={showPassword===false ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              
              {showPassword===false ? 
              <span className="btn btn-light">
                <BsEyeSlash className="icon" onClick={() => setShowPassword(true)} />
                </span>
                :
                <span className="btn btn-light">
                <BsEye className="icon" onClick={() => setShowPassword(false)} />
                </span>
                }
                </div>
              <Form.Control.Feedback type="invalid">
              {typeof errors.password === "string"
                  ? errors.password
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik09">
              <Form.Label>Confirm Password</Form.Label>
              <div className="d-flex gap-1">
              <Form.Control
                type={showRepeatedPassword===false ? "password" : "text"}
                placeholder="Confirm Password"
                name="repeatedPassword"
                value={values.repeatedPassword}
                onChange={handleChange}
                isValid={touched.repeatedPassword && !errors.repeatedPassword}
                isInvalid={!!errors.repeatedPassword}
              />
              {showRepeatedPassword===false ? 
              <span className="btn btn-light">
                <BsEyeSlash className="icon" onClick={() => setShowRepeatedPassword(true)} />
                </span>
                :
                <span className="btn btn-light">
                <BsEye className="icon" onClick={() => setShowRepeatedPassword(false)} />
                </span>
                }
                </div>
              <Form.Control.Feedback type="invalid">
              {typeof errors.repeatedPassword === "string"
                  ? errors.repeatedPassword
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 ROLES">
            <Form.Group as={Col} md="6" controlId="description">
              <Form.Label>Employee Description</Form.Label>
              <Form.Control
                type="text"
                name="shortDescription"
                value={values.shortDescription}
                onChange={handleChange}
                isInvalid={
                  touched.shortDescription && !!errors.shortDescription
                }
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.shortDescription === "string"
                  ? errors.shortDescription
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="stock">
              <Form.Label>Role(s)</Form.Label>
              <SelectMultipleRoles
                rolesSelected={values.userRoles}
                handleChangeRoles={(selectedOption) => {
                  setFieldValue("userRoles", selectedOption);
                }}
              />
              {/* <Form.Control
                    type="text"
                    name="roleId"
                    value={values.roleId}
                    onChange={handleChange}
                    isInvalid={touched.roleId && !!errors.roleId}
                  /> */}
              <Form.Control.Feedback type="invalid">
                {typeof errors.roleId === "string"
                  ? errors.roleId
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 BRANCHES">
            <Form.Group as={Col} md="6" controlId="description">
              <Form.Label>Branch(es) </Form.Label>
              <SelectMultipleBranches
                branchesSelected={values.branch}
                handleChangeBranches={(listBranches) => {
                  setFieldValue("branch", listBranches);
                  /* setInitialFormikValues({
                            ...values,
                            branch: listBranches,
                            }); */
                }}
              />
              {/* <Form.Control
                    type="text"
                    name="branch"
                    value={values.branch}
                    onChange={handleChange}
                    isInvalid={
                      touched.branch && !!errors.branch
                    }
                  /> */}
              <Form.Control.Feedback type="invalid">
                {typeof errors.branch === "string"
                  ? errors.branch
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="stock">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.email === "string"
                  ? errors.email
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* <Row className="mb-3 CITY">
                <Form.Group as={Col} md="6" controlId="validationFormik14">
                  <Form.Label>State</Form.Label>
                  <SelectState
                    stateSelected={values.state}
                    handleChangeState={(option) => {
                      if (option !== "" && option !== "choose") {
                        setFieldValue("state", option);
                        setStateSelected(option);
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik13">
                  <Form.Label>
                    City
                    {(stateSelected === "" || stateSelected === "choose") && (
                      <span
                        style={{ fontSize: "12px" }}
                        className="ps-2 text-danger"
                      >
                        First Select State Please
                      </span>
                    )}
                  </Form.Label>
    
                  <SelectCity
                    state={values.state}
                    citySelected={values.city}
                    handleChangeCity={(option) => {
                      if (option !== "" && option !== "choose") {
                        setFieldValue("city", option);
                      }
                    }}
                  />
                </Form.Group>
              </Row> */}

          <div className="d-flex flex-column align-items-center gap-2 my-3">
            <Button type="submit" variant="outline-success">
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}
              {!loading && (
                <span>{dataIdEmployee !== "" ? "Update" : "Save"}</span>
              )}
            </Button>
            <Link href="/">
              <Button type="button" className="btn btn-light">
                Cancel?
              </Button>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormAddEditEmployee;
