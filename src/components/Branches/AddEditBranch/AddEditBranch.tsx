import { useState, useEffect } from "react";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import SelectBranch from "./SelectBranch";
import { Button, Spinner } from "react-bootstrap";
import { AiOutlineCamera } from "react-icons/ai";
import ModalScanCode from "@/components/Product/ModalScanCode";
import { FaSearch, FaImage } from "react-icons/fa";
//importaremos el icono de cerrar de react-icons para cerrar el modal de busqueda
import { IoIosCloseCircleOutline } from "react-icons/io";
import ModalSearchBranch from "./ModalSearchBranch";
import FormAddEditBranch from "./FormAddEditBranch";
import UploadImage from "@/components/UploadImage/UploadImage";
import MainModal from "@/components/MainModal/MainModal";
import * as yup from "yup";
import { getBranchesByBusinessOwnerEmail } from "@/api/apiBranches";
import {
  editProfileUser,
  editProfileUserByQuery,
  getDataBusinessOwnerById,
  registerUser,
} from "@/api/apiUsers";
//import { get } from 'http'

const initDataBranch = {
  businessName: "",
  legalName: "",
  shortDescription: "",
  branchCategory: "",
  shortAddress: "",
  completeAddress: "",
  state: "",
  city: "",
};

const AddEditBranch = () => {
  const [dataIdBranch, setDataIdBranch] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const { dataLocalStorage } = useContext(MyContext);
  const [imageBranch, setImageBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [initialFormikValues, setInitialFormikValues] =
    useState(initDataBranch);
  const [stateSelected, setStateSelected] = useState("");
  //const [numberBranch, setNumberBranch] = useState(0);

  useEffect(() => {
    //console.log('dataLocalStorage:', dataLocalStorage);
    getNumberBranches();
  }, []);

  useEffect(() => {
    //console.log('initialFormikValues:', initialFormikValues);
  }, [initialFormikValues]);

  useEffect(() => {
    //console.log('dataIdBranch:', dataIdBranch);
    if (dataIdBranch !== "") {
      getDataBranch();
    } else {
      setInitialFormikValues(initDataBranch);
      setStateSelected("");
      setImageBranch(null);
    }
  }, [dataIdBranch]);

  const getNumberBranches = async () => {
    if (dataLocalStorage.email) {
      setLoading(true);
      //console.log('dataLocalStorage.email(getNumberBranches):', dataLocalStorage.email);
      const res = await getBranchesByBusinessOwnerEmail(
        dataLocalStorage.email,
        "",
        1,
        10
      );
      const { docs, totalDocs } = res;
      //console.log('res(numberBranches):', res);
      //console.log('docs:', docs);
      //console.log('totalDocs:', totalDocs);
      setLoading(false);
      if (totalDocs !== undefined) {
        //el prefijo se construye con el totalDocs que es el indice del ultimo branch
        //en un formato de 4 digitos, por ejemplo si totalDocs es 1, el prefijo es 0001
        //si totalDocs es 10, el prefijo es 0010
        //console.log('determinando prefijo para el branch');
        const numberBranch = totalDocs + 1;
        let prefix = "";
        if (numberBranch < 10) {
          prefix = `BR000${numberBranch}`;
        } else if (numberBranch < 100) {
          prefix = `BR00${numberBranch}`;
        } else if (numberBranch < 1000) {
          prefix = `BR0${numberBranch}`;
        } else {
          prefix = `BR${numberBranch}`;
        }
        //ahora le asignamos el prefijo al businessName del branch en el initialFormikValues
        //console.log('prefix(BR):', prefix);
        setInitialFormikValues({
          ...initialFormikValues,
          businessName: prefix,
        });
      }
    }
  };

  const getDataBranch = async () => {
    try {
      setLoading(true);
      const res = await getDataBusinessOwnerById(dataIdBranch);
      console.log("res(getDataBranch):", res);
      setLoading(false);
      //const { docs } = res;
      if (res) {
        const {
          businessName,
          legalName,
          shortDescription,
          branchCategory,
          shortAddress,
          completeAddress,
          state,
          city,
        } = res;
        setInitialFormikValues({
          businessName,
          legalName,
          shortDescription,
          branchCategory,
          shortAddress,
          completeAddress,
          state,
          city,
        });
        //console.log('++++++++ setStateSelected(state): +++++++', state);
        setStateSelected(state);
        setImageBranch(res.imageUrl);
      }
    } catch (error) {
      console.log("error(getDataBranch):", error);
    }
  };

  const schema = yup.object().shape({
    businessName: yup.string().required("Branch name is required"),
    legalName: yup.string().required("Branch name is required"),
    shortDescription: yup.string().required("Description is required"),
    branchCategory: yup.string().required("Branch category is required"),
    shortAddress: yup.string().required("Address is required"),
    completeAddress: yup.string().required("Neighborhood is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
  });

  const handleShowModalSearch = () => {
    setDataIdBranch("");
    setShowModalSearch(true);
  };

  const handleSaveBranch = async (values: any) => {
    console.log("values(Create/Update Branch):", values);
    try {
      let dataValues = null;
      //checar que si hay una imagen y que no sea un string
      if (imageBranch && typeof imageBranch !== "string") {
        dataValues = new FormData();
        dataValues.append("file", imageBranch);
        dataValues.append("roleId", "branch");
        dataValues.append("businessOwner", dataLocalStorage.email);
        dataValues.append(
          "email",
          `${values.businessName}@${values.legalName}.com`
        );
        for (const key in values) {
          dataValues.append(key, values[key]);
        }
      } else {
        dataValues = {
          ...values,
          roleId: "branch",
          businessOwner: dataLocalStorage.email,
          email: `${values.businessName}@${values.legalName}.com`,
        };
      }
      let result = null;
      //console.log('dataIdProduct:..', dataIdProduct);
      setLoading(true);
      if (dataIdBranch === "") {
        result = await registerUser(dataValues);
      } else {
        console.log("Editando branch...dataValues:..", dataValues);
        //return;
        result = await editProfileUserByQuery(
          dataValues,
          dataLocalStorage.access_token,
          dataIdBranch
        );
      }
      setLoading(false);
      console.log("resultCreateUpdateBranch:..", result);
      const { businessName } = result;
      if (businessName) {
        setSuccessModal(true);
        //se reinician los valores del formulario
        setInitialFormikValues(initDataBranch);
        setImageBranch(null);
        setDataIdBranch("");
        return;
      }

      setErrorModal(true);
      console.log("Error CreateUpdateBranch:..", result);
      if (result.response.data.message) {
        console.log(
          "Error CreateUpdateBranch:.." + result.response.data.message
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
        <h5>Search Branch to Edit:</h5>
        <h6 className="alert alert-success d-none">idBranch:{dataIdBranch}</h6>
        <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
          <div className="w-100 d-flex gap-2 justify-content-center align-items-center">
            <div className="w-75">
              <SelectBranch
                emailBusinessOwner={dataLocalStorage.email}
                dataIdBranch={dataIdBranch}
                setDataIdBranch={setDataIdBranch}
              />
            </div>
            <Button
              onClick={() => setDataIdBranch("")}
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
        {/* {showScanner && <ModalScanCode showModal={showScanner} setShowModal={setShowScanner} valueScanner={dataIdBranch} setValueScanner={setDataIdBranch} />} */}
        {showModalSearch && (
          <ModalSearchBranch
            emailBusinessOwner={dataLocalStorage.email}
            showModalSearch={showModalSearch}
            setShowModalSearch={setShowModalSearch}
            setDataIdBranch={setDataIdBranch}
            dataIdBranch={dataIdBranch}
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
        {dataIdBranch !== "" ? "EDIT " : "ADD "}
        BRANCH
      </h2>
      <div className="card me-auto ms-auto py-2 px-4 mb-3 w-75">
        {!imageBranch && (
          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <FaImage className="text-center" style={{ fontSize: "200px" }} />
            <p className="text-center">Please upload an image</p>
          </div>
        )}

        <div className="ms-auto me-auto d-block">
          <UploadImage setDataImg={setImageBranch} dataImg={imageBranch} />
        </div>

        <FormAddEditBranch
          schema={schema}
          handleSaveBranch={handleSaveBranch}
          initialFormikValues={initialFormikValues}
          loading={loading}
          dataIdBranch={dataIdBranch}
          stateSelected={stateSelected}
          setStateSelected={setStateSelected}
        />

        {successModal && (
          <MainModal
            dataModal={{
              showModal: successModal,
              setShowModal: setSuccessModal,
              title: "Success",
              text: "Product changes has been saved successfully",
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
              text: "An error occurred while saving the product",
              severity: "danger",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddEditBranch;
