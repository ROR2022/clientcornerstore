import React from 'react'
import BranchesCatalog from '../AddEditBranch/BranchesCatalog'
import { useContext } from 'react'
import MyContext from '@/context/MyContext'


const ShowBranches = () => {
  const { dataLocalStorage } = useContext(MyContext);
  return (
    <div>
      <BranchesCatalog emailBusinessOwner={dataLocalStorage.email} setDataIdBranch={(data)=>console.log(data)} />
      </div>
  )
}

export default ShowBranches