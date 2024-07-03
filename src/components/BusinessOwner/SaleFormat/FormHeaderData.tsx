"use client";
import { useEffect, useState, FC } from "react";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import { getDataBusinessOwnerById } from "@/api/apiUsers";
import dynamic from "next/dynamic";
const SelectItems = dynamic(() => import("./SelectItems"), { ssr: false });
//import SelectItems from './SelectItems';
import { getEmployeesByFilter } from "@/api/apiEmployees";

/*
*Aqui se muestra la informacion de la cabecera del formulario
aqui se determina el branch, el manager, el supervisor y el cashier en turno

*/

interface IFormHeaderData {
  dataHeaderSales: any;
  setDataHeaderSales: (data: any) => void;
}

const FormHeaderData: FC<IFormHeaderData> = ({
  dataHeaderSales,
  setDataHeaderSales,
}) => {
  const { dataLocalStorage } = useContext(MyContext);
  //la lista de branches se obtiene de la data del local storage en su campo branch
  const [listBranches, setListBranches] = useState<any>([]);
  const [listManagers, setListManagers] = useState<any>([]);
  const [listSupervisors, setListSupervisors] = useState<any>([]);
  const [listCashiers, setListCashiers] = useState<any>([]);
  const [selectedBranch, setSelectedBranch] = useState<any>(dataHeaderSales.branch || null);
  const [selectedManager, setSelectedManager] = useState<any>(dataHeaderSales.manager || null);
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>(dataHeaderSales.supervisor || null);
  const [selectedCashier, setSelectedCashier] = useState<any>(dataHeaderSales.cashier || null);

  useEffect(() => {
    setDataHeaderSales({
      branch: selectedBranch,
      manager: selectedManager,
      supervisor: selectedSupervisor,
      cashier: selectedCashier,
    });
  }, [selectedBranch, selectedManager, selectedSupervisor, selectedCashier]);

  useEffect(() => {
    setSelectedBranch(dataHeaderSales.branch);
    setSelectedManager(dataHeaderSales.manager);
    setSelectedSupervisor(dataHeaderSales.supervisor);
    setSelectedCashier(dataHeaderSales.cashier);
  }, [dataHeaderSales]);

  useEffect(() => {
    console.log("dataLocalStorage:..", dataLocalStorage);
    if (
      dataLocalStorage.branch !== undefined &&
      dataLocalStorage.branch !== null
    ) {
      //setListBranches(dataLocalStorage.branch);
      prepareListBranches(dataLocalStorage.branch);
      prepareListManagers(dataLocalStorage.businessOwner);
      prepareListSupervisors(dataLocalStorage.businessOwner);
      prepareListCashiers(dataLocalStorage.businessOwner);
    }
  }, [dataLocalStorage]);

  const prepareListBranches = async (branches: any) => {
    //aqui preparamos la lista de branches ya que es una lista de string con el id del branch
    try {
      let listBranchesTemp: any = [];
      for (let index = 0; index < branches.length; index++) {
        const element = branches[index];
        //aqui obtenemos la data de cada branch
        const response = await getDataBusinessOwnerById(element);
        // del response obtenemos el businessName y el legalName
        const { businessName, legalName, _id } = response;
        const branchData = {
          value: _id,
          label: `${businessName} - ${legalName}`,
        };
        listBranchesTemp.push(branchData);
      }
      setListBranches(listBranchesTemp);
    } catch (error) {
      console.log("error:..", error);
    }
  };

  const prepareListManagers = async (id: string) => {
    const dataFilter = {
      category: "manager",
      emailBusinessOwner: id,
      query: "",
    };
    try {
      const response = await getEmployeesByFilter(dataFilter);
      //console.log('response:..',response);
      const { dataEmployees } = response;
      let listManagersTemp: any = [];
      for (let index = 0; index < dataEmployees.length; index++) {
        const element = dataEmployees[index];
        const { businessName, legalName, _id } = element;
        const managerData = {
          value: _id,
          label: `${businessName} ${legalName}`,
        };
        listManagersTemp.push(managerData);
      }
      setListManagers(listManagersTemp);
    } catch (error) {
      console.log("error:..", error);
    }
  };

  const prepareListSupervisors = async (id: string) => {
    const dataFilter = {
      category: "supervisor",
      emailBusinessOwner: id,
      query: "",
    };
    try {
      const response = await getEmployeesByFilter(dataFilter);
      //console.log('response:..',response);
      const { dataEmployees } = response;
      let listTemp: any = [];
      for (let index = 0; index < dataEmployees.length; index++) {
        const element = dataEmployees[index];
        const { businessName, legalName, _id } = element;
        const employeeData = {
          value: _id,
          label: `${businessName} ${legalName}`,
        };
        listTemp.push(employeeData);
      }
      setListSupervisors(listTemp);
    } catch (error) {
      console.log("error:..", error);
    }
  };

  const prepareListCashiers = async (id: string) => {
    const dataFilter = {
      category: "cashier",
      emailBusinessOwner: id,
      query: "",
    };
    try {
      const response = await getEmployeesByFilter(dataFilter);
      //console.log('response:..',response);
      const { dataEmployees } = response;
      let listTemp: any = [];
      for (let index = 0; index < dataEmployees.length; index++) {
        const element = dataEmployees[index];
        const { businessName, legalName, _id } = element;
        const employeeData = {
          value: _id,
          label: `${businessName} ${legalName}`,
        };
        listTemp.push(employeeData);
      }
      setListCashiers(listTemp);
    } catch (error) {
      console.log("error:..", error);
    }
  };

  return (
    <div className="d-flex flex-wrap gap-2 w-100 justify-content-center align-items-center me-auto ms-auto p-2 my-2">
      <div className="">
        <span>Branch:</span>
        <SelectItems
          key={"listBranches"}
          placeholder="Choose a branch"
          dataItems={listBranches}
          itemSelected={selectedBranch}
          setItemSelected={setSelectedBranch}
        />
      </div>
      <div className="">
        <span>Manager:</span>
        <SelectItems
          key={"listManagers"}
          placeholder="Choose a manager"
          dataItems={listManagers}
          itemSelected={selectedManager}
          setItemSelected={setSelectedManager}
        />
      </div>
      <div className="">
        <span>Supervisor:</span>
        <SelectItems
          key={"listSupervisors"}
          placeholder="Choose a supervisor"
          dataItems={listSupervisors}
          itemSelected={selectedSupervisor}
          setItemSelected={setSelectedSupervisor}
        />
      </div>
      <div className="">
        <span>Cashier:</span>
        <SelectItems
          key={"listCashiers"}
          placeholder="Choose a cashier"
          dataItems={listCashiers}
          itemSelected={selectedCashier}
          setItemSelected={setSelectedCashier}
        />
      </div>
    </div>
  );
};

export default FormHeaderData;
