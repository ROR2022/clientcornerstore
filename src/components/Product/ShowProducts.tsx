import React from 'react'
import ProductsCatalog from '../BusinessOwner/ShowProfile/ProductsCatalog'
import { useContext } from 'react'
import MyContext from '@/context/MyContext'


const ShowProducts = () => {
    const {dataLocalStorage}= useContext(MyContext);
    const {email}=dataLocalStorage;

  return (
    <div>
        <ProductsCatalog emailUser={email} setIdProduct={(data)=>console.log(data)} />
    </div>
  )
}

export default ShowProducts