//import { get } from 'http'
import {useState, useEffect} from 'react'
import { getDataUsers } from '@/api/apiUsers'
import StoreCard from './StoreCard'

const StoresCatalog = () => {
    const [stores, setStores] = useState([])
    useEffect(() => {
        getStores();
    }, [])

    const getStores = async () => {
        try {
            const response = await getDataUsers('businessOwner',1,10)
            console.log(response)
            const docs = response.docs
            console.log(docs)
            if (docs)
            setStores(docs)
        
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <h1 className='alert alert-info text-center'>Stores Catalog</h1>
        <div className='d-flex flex-wrap gap-2 my-3 border rounded bg-light justify-content-center py-3'>
        {stores?.map((store:any) => (
            <StoreCard key={store._id} dataStore={store} />
        ))}
        </div>
    </div>
  )
}

export default StoresCatalog