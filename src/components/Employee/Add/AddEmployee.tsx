import { FC, useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaImage, FaSearch } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import * as yup from "yup";
import { useContext } from "react";
import { MyContext } from "../../../context/MyContext";
import MainModal from "@/components/MainModal/MainModal";
import UploadImage from "@/components/UploadImage/UploadImage";
import SelectBranch from "@/components/Branches/AddEditBranch/SelectBranch";
import ModalSearchBranch from "@/components/Branches/AddEditBranch/ModalSearchBranch";
import FormAddEditEmployee from "./FormAddEditEmployee";
import {
  editProfileUserByQuery,
  getDataBusinessOwnerById,
  registerUser,
} from "@/api/apiUsers";

const initDataEmployee = {
  businessName: "",
  legalName: "",
  email: "",
  password: "",
  repeatedPassword: "",
  shortDescription: "",
  userRoles: [],
  branch: [],
};

// preparamos una expresion regular para validar el email
//const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const AddEmployee = () => {
  const [dataIdEmployee, setDataIdEmployee] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const { dataLocalStorage } = useContext(MyContext);
  const [imageEmployee, setImageEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [initialFormikValues, setInitialFormikValues] =
    useState<any>(initDataEmployee);
  const [stateSelected, setStateSelected] = useState("");
  //const [numberEmployee, setNumberEmployee] = useState(0);

  useEffect(() => {
    //console.log('dataLocalStorage:', dataLocalStorage);
    //getNumberEmployeees();
  }, []);

  useEffect(() => {
    console.log('initialFormikValues(addEmployee):', initialFormikValues);
  }, [initialFormikValues]);

  useEffect(() => {
    //console.log('dataIdEmployee:', dataIdEmployee);
    if (dataIdEmployee !== "") {
      getDataEmployee();
    } else {
      setInitialFormikValues(initDataEmployee);
      setStateSelected("");
      setImageEmployee(null);
    }
  }, [dataIdEmployee]);

  /* const getNumberEmployeees = async () => {
    if (dataLocalStorage.email) {
      setLoading(true);
      //console.log('dataLocalStorage.email(getNumberEmployeees):', dataLocalStorage.email);
      const res = await getEmployeeesByBusinessOwnerEmail(
        dataLocalStorage.email,
        "",
        1,
        10
      );
      const { docs, totalDocs } = res;
      //console.log('res(numberEmployeees):', res);
      //console.log('docs:', docs);
      //console.log('totalDocs:', totalDocs);
      setLoading(false);
      if (totalDocs !== undefined) {
        //el prefijo se construye con el totalDocs que es el indice del ultimo Employee
        //en un formato de 4 digitos, por ejemplo si totalDocs es 1, el prefijo es 0001
        //si totalDocs es 10, el prefijo es 0010
        //console.log('determinando prefijo para el Employee');
        const numberEmployee = totalDocs + 1;
        let prefix = "";
        if (numberEmployee < 10) {
          prefix = `BR000${numberEmployee}`;
        } else if (numberEmployee < 100) {
          prefix = `BR00${numberEmployee}`;
        } else if (numberEmployee < 1000) {
          prefix = `BR0${numberEmployee}`;
        } else {
          prefix = `BR${numberEmployee}`;
        }
        //ahora le asignamos el prefijo al businessName del Employee en el initialFormikValues
        //console.log('prefix(BR):', prefix);
        setInitialFormikValues({
          ...initialFormikValues,
          businessName: prefix,
        });
      }
    }
  }; */

  const getDataEmployee = async () => {
    try {
      setLoading(true);
      const res = await getDataBusinessOwnerById(dataIdEmployee);
      console.log("res(getDataEmployee):", res);
      setLoading(false);
      //const { docs } = res;
      if (res) {
        const {
          businessName,
          legalName,
          email,
          password,
          shortDescription,
          userRoles,
          branch,
        } = res;
        setInitialFormikValues({
          businessName,
          legalName,
          email,
          password:'',
          repeatedPassword:'',
          shortDescription,
          userRoles,
          branch,
        });
        //console.log('++++++++ setStateSelected(state): +++++++', state);
        //setStateSelected(state);
        if(res.imageUrl && res.imageUrl !== "")
        setImageEmployee(res.imageUrl);
        else
        setImageEmployee(null);
      }
    } catch (error) {
      console.log("error(getDataEmployee):", error);
    }
  };

  const schema = yup.object().shape({
    businessName: yup.string().required("Employee name is required"),
    legalName: yup.string().required("Employee name is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Invalid email"
      ),
    password: yup.string(),
    repeatedPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
    shortDescription: yup.string().required("Description is required"),
    userRoles: yup.array().required("Roles are required"),
    branch: yup.array().required("Branch is required"),
  });

  const handleShowModalSearch = () => {
    setDataIdEmployee("");
    setShowModalSearch(true);
  };

  const handleSaveEmployee = async (values: any) => {
    //console.log("values(Create/Update Employee):", values);
    const {userRoles, branch, ...userValuesTemp} = values;
    //determinar si se agrega el password o no
    let userValues = null;
    if(dataIdEmployee === "" || userValuesTemp.password !== ""){
      //solo se elimina el campo repeatedPassword
      const {repeatedPassword, ...rest} = userValuesTemp;
      userValues = rest;
    }
    else{
      const {password, repeatedPassword, ...rest} = userValuesTemp;
      userValues = rest;
    }
    try {
      let dataValues = null;
      //checar que si hay una imagen y que no sea un string
      
        dataValues = new FormData();
        if (imageEmployee && typeof imageEmployee !== "string") {
        dataValues.append("file", imageEmployee);
        }
        dataValues.append("businessOwner", dataLocalStorage.email);
        for (const key in userValues) {
          dataValues.append(key, userValues[key]);
        }
        //agregaremos el array de roles al dataForm dataValues para enviarlo al backend
        dataValues.append("userRoles", JSON.stringify(userRoles));
        //agregaremos el array de branches al dataForm dataValues para enviarlo al backend
        dataValues.append("branch", JSON.stringify(branch));

      
      let result = null;
      //console.log('dataIdProduct:..', dataIdProduct);
      setLoading(true);
      if (dataIdEmployee === "") {
        result = await registerUser(dataValues);
      } else {
        console.log("Editando Employee...dataValues:..", dataValues);
        //return;
        result = await editProfileUserByQuery(
          dataValues,
          dataLocalStorage.access_token,
          dataIdEmployee
        );
      }
      setLoading(false);
      console.log("resultCreateUpdateEmployee:..", result);
      const { businessName } = result;
      if (businessName) {
        setSuccessModal(true);
        //se reinician los valores del formulario
        setInitialFormikValues(initDataEmployee);
        setImageEmployee(null);
        setDataIdEmployee("");
        return;
      }

      setErrorModal(true);
      console.log("Error CreateUpdateEmployee:..", result);
      if (result.response.data.message) {
        console.log(
          "Error CreateUpdateEmployee:.." + result.response.data.message
        );
      }

      return;
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div>
      <div className="card w-75 my-2 p-2 me-auto ms-auto">
        <h5>Search Employee to Edit:</h5>
        <h6 className="alert alert-success d-none">
          idEmployee:{dataIdEmployee}
        </h6>
        <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
          <div className="w-100 d-flex gap-2 justify-content-center align-items-center">
            <div className="w-75">
              <SelectBranch
                emailBusinessOwner={dataLocalStorage.email}
                dataIdBranch={dataIdEmployee}
                setDataIdBranch={setDataIdEmployee}
                isEmployee={true}
              />
            </div>
            <Button
              onClick={() => setDataIdEmployee("")}
              className="btn btn-light"
            >
              <IoIosCloseCircleOutline />
            </Button>
            <Button onClick={handleShowModalSearch} className="btn btn-light">
              <FaSearch />
            </Button>
          </div>

          {/* <Button onClick={handleShowScanner} className='btn btn-light'><AiOutlineCamera /></Button> */}
        </div>
        {/* {showScanner && <ModalScanCode showModal={showScanner} setShowModal={setShowScanner} valueScanner={dataIdEmployee} setValueScanner={setDataIdEmployee} />} */}
        {showModalSearch && (
          <ModalSearchBranch
            emailBusinessOwner={dataLocalStorage.email}
            showModalSearch={showModalSearch}
            setShowModalSearch={setShowModalSearch}
            setDataIdBranch={setDataIdEmployee}
            dataIdBranch={dataIdEmployee}
            isEmployee={true}
          />
        )}
      </div>

      <h6 className="alert alert-info text-center my-2">
        Please do not forget Save changes
      </h6>
      <div className="w-100 d-flex justify-content-center my-3">
        <Spinner
          animation="border"
          variant="primary"
          className={loading ? "d-block" : "d-none"}
        />
      </div>
      <h2 className="text-center fs-1">
        {dataIdEmployee !== "" ? "EDIT " : "ADD "}
        EMPLOYEE
      </h2>
      <div className="card me-auto ms-auto py-2 px-4 mb-3 w-75">
        {!imageEmployee && (
          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <FaImage className="text-center" style={{ fontSize: "200px" }} />
            <p className="text-center">Please upload an image</p>
          </div>
        )}

        <div className="ms-auto me-auto d-block">
          <UploadImage setDataImg={setImageEmployee} dataImg={imageEmployee} />
        </div>

        <FormAddEditEmployee
          schema={schema}
          handleSaveEmployee={handleSaveEmployee}
          initialFormikValues={initialFormikValues}
          setInitialFormikValues={setInitialFormikValues}
          loading={loading}
          dataIdEmployee={dataIdEmployee}
          stateSelected={stateSelected}
          setStateSelected={setStateSelected}
        />

        {successModal && (
          <MainModal
            dataModal={{
              showModal: successModal,
              setShowModal: setSuccessModal,
              title: "Success",
              text: "Changes has been saved successfully",
              severity: "success",
            }}
          />
        )}
        {errorModal && (
          <MainModal
            dataModal={{
              showModal: errorModal,
              setShowModal: setErrorModal,
              title: "Error",
              text: "An error occurred while saving",
              severity: "danger",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddEmployee;
