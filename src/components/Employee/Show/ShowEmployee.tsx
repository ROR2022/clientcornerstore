import React from 'react'
import BranchesCatalog from '@/components/Branches/AddEditBranch/BranchesCatalog'
import  MyContext  from '@/context/MyContext'
import { useContext } from 'react'

const ShowEmployee = () => {
  const { dataLocalStorage } = useContext(MyContext);
  return (
    <div>
      <BranchesCatalog setDataIdBranch={(data)=>console.log(data)}  emailBusinessOwner={dataLocalStorage.email} isEmployee={true} />
      </div>
  )
}

export default ShowEmployee