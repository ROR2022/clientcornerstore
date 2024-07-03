import {useState, FC} from 'react'
//importaremos el icono de busqueda de la libreria de react-icons
import { FaSearch } from 'react-icons/fa';
import ModalFilterProducts from './ModalFilterProducts';

interface FilterProductsProps {
    emailUser: string;
    setDataProducts: (dataProducts:any) => void;
}

const FilterProducts: FC<FilterProductsProps> = ({emailUser,setDataProducts}) => {
const [showModalFilter, setShowModalFilter] = useState(false);
const handleShowModalFilter = () => {
    setShowModalFilter(true);
}
  return (
    <>
    <div 
    onClick={handleShowModalFilter}
    className='border rounded d-flex gap-2 btn btn-outline-info justify-content-center align-items-center w-50 me-auto ms-auto my-3'>
        <span><FaSearch className='' /></span>
        <span>Filter</span>
    </div>
    <ModalFilterProducts showModalFilter={showModalFilter} setShowModalFilter={setShowModalFilter} emailUser={emailUser} setDataProducts={setDataProducts} />
    </>
  )
}

export default FilterProducts