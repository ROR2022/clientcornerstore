import { FC, useState } from "react";
import ModalFilterBranches from "./ModalFilterBranches";
import { FaSearch } from "react-icons/fa";

interface FilterBranchesProps {
  emailBusinessOwner: string;
  setDataBranches: (dataBranches: any) => void;
  isEmployee?: boolean;
}
const FilterBranches: FC<FilterBranchesProps> = ({
  emailBusinessOwner,
  setDataBranches,
  isEmployee,
}) => {
  const [showModalFilter, setShowModalFilter] = useState(false);
  const handleShowModalFilter = () => {
    setShowModalFilter(true);
  };
  return (
    <>
      <div
        onClick={handleShowModalFilter}
        className="border rounded d-flex gap-2 btn btn-outline-info justify-content-center align-items-center w-50 me-auto ms-auto my-3"
      >
        <span>
          <FaSearch className="" />
        </span>
        <span>Filter</span>
      </div>
      <ModalFilterBranches
        showModalFilter={showModalFilter}
        setShowModalFilter={setShowModalFilter}
        emailBusinessOwner={emailBusinessOwner}
        setDataBranches={setDataBranches}
        isEmployee={isEmployee}
      />
    </>
  );
};

export default FilterBranches;
