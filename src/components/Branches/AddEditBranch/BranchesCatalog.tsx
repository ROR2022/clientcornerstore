import { FC, useState, useEffect } from "react";
import { getBranchesByBusinessOwnerEmail } from "@/api/apiBranches";
import { getEmployees } from "@/api/apiEmployees";
import { FaRedo } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import BranchCard from "./BranchCard";
import FilterBranches from "./FilterBranches";

interface BranchesCatalogProps {
  emailBusinessOwner: string;
  setDataIdBranch: (dataIdBranch: string) => void;
  isEmployee?: boolean;
}

const BranchesCatalog: FC<BranchesCatalogProps> = ({
  emailBusinessOwner,
  setDataIdBranch,
  isEmployee,
}) => {
  const [branches, setBranches] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log('emailUser:..',emailUser);
    if (emailBusinessOwner) {
      setLoading(true);
      if (isEmployee !== true) {
        getBranchesByBusinessOwnerEmail(emailBusinessOwner)
          .then((res: any) => {
            console.log("res(dataBranches):...", res);
            setLoading(false);
            const { docs } = res;
            if (docs.length === 0 || !docs) {
              console.log("No branches:...");
              return;
            }
            setBranches([...docs]);
          })
          .catch((err) => {
            console.log("err:...", err);
            setLoading(false);
          });
      } else {
        //getDataEmployees
        getDataEmployees();
      }
      setLoading(false);
    }
  }, [emailBusinessOwner]);

  const getDataEmployees = async () => {
    try {
      const result = await getEmployees(emailBusinessOwner);
      console.log("result(getDataEmployees):...", result);
      if(result){
        setBranches([...result]);
      }
    } catch (error) {
      console.log("error:...", error);
    }
  };

  const handleReload = () => {
    setLoading(true);
    if(isEmployee!==true){
    getBranchesByBusinessOwnerEmail(emailBusinessOwner)
      .then((res: any) => {
        console.log("res(reloadBranchesCatalog):...", res);
        setLoading(false);
        const { docs } = res;
        if (docs?.length === 0 || !docs) {
          console.log("No hay productos:...");
          return;
        }
        setBranches([...docs]);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err:...", err);
      });
    }else{
        getDataEmployees();
    }
  };

  return (
    <div className="card my-3 p-2">
      <h3 className="text-center">
        {isEmployee===true ? "EMPLOYEE " : "BRANCHES "}
        CATALOG
        <span className="btn btn-outline-secondary ms-1" onClick={handleReload}>
          <FaRedo />
        </span>
      </h3>
      <h6 className="text-center">{isEmployee===true?'Employees ':'Branches '} shown: {branches.length}</h6>
      <FilterBranches
        emailBusinessOwner={emailBusinessOwner}
        setDataBranches={setBranches}
        isEmployee={isEmployee}
      />
      {loading && (
        <div className="d-block me-auto ms-auto my-3">
          <Spinner />
        </div>
      )}
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {branches.map((branch: any) => (
          <BranchCard
            key={branch._id}
            dataBranch={branch}
            setDataIdBranch={setDataIdBranch}
          />
        ))}
      </div>
    </div>
  );
};

export default BranchesCatalog;
