import {
  getDataBranchesCategories,
  getBranchesByFilter,
} from "@/api/apiBranches";
import { getEmployeesByFilter } from "@/api/apiEmployees";
import { FC, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";

interface ModalFilterBranchesProps {
  showModalFilter: boolean;
  setShowModalFilter: (showModalFilter: boolean) => void;
  emailBusinessOwner: string;
  setDataBranches: (dataBranches: any) => void;
  isEmployee?: boolean;
}

const initFilterParams = {
  category: "",
  query: "",
  emailBusinessOwner: "",
};

const ModalFilterBranches: FC<ModalFilterBranchesProps> = ({
  showModalFilter,
  setShowModalFilter,
  emailBusinessOwner,
  setDataBranches,
  isEmployee,
}) => {
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [dataQuery, setDataQuery] = useState<string>("");

  useEffect(() => {
    //console.log('emailUser:...', emailUser);
    if(isEmployee!==true){
        getDataCategoriesByEmailBusinessOwner();
    }else{
        initEmployeeCategories();
    }
    
  }, []);

  const initEmployeeCategories = () => {
    const tempCategories = [
      { value: "manager", label: "manager" },
      { value: "cashier", label: "cashier" },
      { value: "supervisor", label: "supervisor" },
      { value: "handyman", label: "handyman" },
    ];
    setCategories([...tempCategories]);
  };

  const getDataCategoriesByEmailBusinessOwner = async () => {
    try {
      const result = await getDataBranchesCategories(emailBusinessOwner);
      console.log("result:...", result);
      const { categories } = result;
      if (categories.length === 0 || !categories) {
        console.log("No hay categorias:...");
        return;
      } else {
        const tempCategories = categories.map((category: any) => {
          return { value: category, label: `${category}` };
        });
        setCategories([...tempCategories]);
      }
    } catch (error) {
      console.log("error:...", error);
    }
  };

  const handleChangeCategory = (option: any) => {
    console.log("option:...", option);
    setSelectedCategory(option);
  };
  const handleSearch = async () => {
    try {
      const tempFilterParams = {
        category: selectedCategory?.value || "",
        query: dataQuery || "",
        emailBusinessOwner,
      };
      if (!selectedCategory && !dataQuery) {
        console.log("No filter params:...");
        return;
      }
      //setFilterParams(tempFilterParams);
      let result=null;
      if(isEmployee!==true){
        result = await getBranchesByFilter(tempFilterParams);
      }else{
        result = await getEmployeesByFilter(tempFilterParams);
      }
      console.log("result(filter):...", result);
      const dataBranches = result.dataBranches || result.dataEmployees;

      if (dataBranches?.length === 0 || !dataBranches) {
        console.log("No branches:...");
        setDataBranches([]);
        handleClose();
        return;
      }
      setDataBranches([...dataBranches]);
      handleClose();
    } catch (error) {
      console.log("error:...", error);
    }
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setDataQuery("");
    setShowModalFilter(false);
  };

  return (
    <Modal
      show={showModalFilter}
      onHide={handleClose}
      centered
      className="bg-secondary bg-opacity-25"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={"alert alert-success"}>Filter {isEmployee===true?' Employees':' Branches'}:</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          value={selectedCategory}
          className="w-100 me-auto ms-auto my-2"
          options={categories}
          placeholder="Select Category"
          onChange={(option) => handleChangeCategory(option)}
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Search by name or description..."
          value={dataQuery}
          onChange={(e) => setDataQuery(e.target.value)}
        />
        {selectedCategory && <p>Category: {selectedCategory.label}</p>}
        {dataQuery && <p>Query: {dataQuery}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFilterBranches;
