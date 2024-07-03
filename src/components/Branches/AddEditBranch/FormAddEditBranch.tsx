import { FC, useEffect, useState } from "react";
import { Formik } from "formik";
import {
  Col,
  Form,
  Row,
  Button,
  InputGroup,
  Spinner,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
const SelectCity = dynamic(() => import("@/components/SignUp/SelectCity"), {
  ssr: false,
});
const SelectState = dynamic(() => import("@/components/SignUp/SelectState"), {
  ssr: false,
});

interface FormDataBranchProps {
  schema: any;
  handleSaveBranch: (values: any) => any;
  initialFormikValues: any;
  loading: boolean;
  dataIdBranch: string;
  stateSelected: string;
  setStateSelected: (state: string) => void;
}

const FormAddEditBranch: FC<FormDataBranchProps> = ({
  schema,
  handleSaveBranch,
  initialFormikValues,
  loading,
  dataIdBranch,
  stateSelected,
  setStateSelected,
}) => {
  /* const [stateSelected, setStateSelected] = useState('');
    const [citySelected, setCitySelected] = useState(''); */

  useEffect(() => {
    //console.log('initialFormikValues(dentro del formulario):..', initialFormikValues);
  }, [initialFormikValues]);
  useEffect(() => {}, [dataIdBranch]);
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSaveBranch}
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
              <Form.Label>Prefix</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={values.businessName}
                onChange={handleChange}
                isInvalid={touched.businessName && !!errors.businessName}
                disabled={true}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.businessName === "string"
                  ? errors.businessName
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="price">
              <Form.Label>Branch Name</Form.Label>
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
          <Row className="mb-3 CATEGORY">
            <Form.Group as={Col} md="6" controlId="description">
              <Form.Label>Description</Form.Label>
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
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="branchCategory"
                value={values.branchCategory}
                onChange={handleChange}
                isInvalid={touched.branchCategory && !!errors.branchCategory}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.branchCategory === "string"
                  ? errors.branchCategory
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 ADDRESS">
            <Form.Group as={Col} md="6" controlId="description">
              <Form.Label>Address </Form.Label>
              <Form.Control
                type="text"
                name="shortAddress"
                value={values.shortAddress}
                onChange={handleChange}
                isInvalid={
                  touched.shortAddress && !!errors.shortAddress
                }
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.shortAddress === "string"
                  ? errors.shortAddress
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="stock">
              <Form.Label>Neighborhood</Form.Label>
              <Form.Control
                type="text"
                name="completeAddress"
                value={values.completeAddress}
                onChange={handleChange}
                isInvalid={touched.completeAddress && !!errors.completeAddress}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.completeAddress === "string"
                  ? errors.completeAddress
                  : "An error occurred"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 CITY">
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
          </Row>

          <div className="d-flex flex-column align-items-center gap-2 my-3">
            <Button type="submit" variant="outline-success">
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}
              {!loading && (
                <span>{dataIdBranch !== "" ? "Update" : "Save"}</span>
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

export default FormAddEditBranch;
