import { FC, useState, useEffect } from "react";

interface BranchCardProps {
  dataBranch: any;
  setDataIdBranch: (dataIdBranch: string) => void;
}

const BranchCard: FC<BranchCardProps> = ({ dataBranch, setDataIdBranch }) => {
  const {
    businessName,
    legalName,
    imageUrl,
    branchCategory,
    state,
    city,
    shortDescription,
    email,
    userRoles
  } = dataBranch;

  const [dataRolesUser,setDataRolesUser] = useState<any>('');

  useEffect(() => {
    if(userRoles?.length > 0 && dataRolesUser === ''){
      const tempString = userRoles.map((role:any) => role).join(', ');
      console.log('tempString(userRoles):...',tempString);
      setDataRolesUser(tempString);
      //setDataRolesUser(userRoles.map((role:any) => role).join(', '));
    }
  }, []);
  
  //console.log('dataBranch:...',dataBranch);
  const handleEdit = () => {
    setDataIdBranch(dataBranch._id);
  };
  return (
    <div
      style={{
        cursor: "pointer",
        width: "25rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
      className="card my-3 p-2"
      onClick={handleEdit}
    >
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
        <div>
          <img
            className="rounded-circle"
            src={imageUrl}
            alt={businessName}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div>
          <h4>{businessName}</h4>
          <p>{legalName}</p>
          <p>{branchCategory || dataRolesUser}</p>
          <p>{state || email}</p>
          <p>{city}</p>
          <p>{shortDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
