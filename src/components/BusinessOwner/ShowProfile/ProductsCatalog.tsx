import { getIdsProductsByBusinessOwner } from '@/api/apiProduct';
import {FC,useState,useEffect} from 'react'
import { generateId } from '@/lib/dataCities';
import ProductCard from './ProductCard';
import FilterProducts from './FilterProducts';
//import { FaR } from 'react-icons/fa6';
//importaremos el icono de reload de la libreria de react-icons
import { FaRedo } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

interface ProductsCatalogProps {
    emailUser: string;
    setIdProduct: (dataProduct: any) => void;
}

const ProductsCatalog: FC<ProductsCatalogProps> = ({emailUser, setIdProduct}) => {
    const [products, setProducts] = useState<any>([]);
    const [loading, setLoading]= useState(false);

    useEffect(() => {
        //console.log('emailUser:..',emailUser);
        if(emailUser){
            setLoading(true)
            getIdsProductsByBusinessOwner(emailUser).then((res:any) => {
                //console.log('res:...',res);
                setLoading(false);
                const {dataProducts} = res;
                if(dataProducts.length===0 || !dataProducts){
                    console.log('No hay productos:...');
                    return;
                }
                setProducts([...dataProducts]);
            }).catch((err) => {
                console.log('err:...',err);
                setLoading(false)
            });
        }
    }, [emailUser]);

    const handleReload = () => {
        setLoading(true);
        getIdsProductsByBusinessOwner(emailUser).then((res:any) => {
            //console.log('res:...',res);
            setLoading(false);
            const {dataProducts} = res;
            if(dataProducts.length===0 || !dataProducts){
                console.log('No hay productos:...');
                return;
            }
            setProducts([...dataProducts]);
        }).catch((err) => {
            setLoading(false);
            console.log('err:...',err);
        });
    }

  return (
    <div className='card my-3 p-2'>
        <h3 className='text-center'>
            PRODUCTS CATALOG
            <span className='btn btn-outline-secondary ms-1' onClick={handleReload}>
                <FaRedo/>
            </span>
        </h3>
        <h6 className='text-center'>Products shown: {products.length}</h6>
        <FilterProducts emailUser={emailUser} setDataProducts={setProducts} />
        {loading && 
        <div className='d-block me-auto ms-auto my-3'>
            <Spinner/>
        </div>
        }
        <div className='d-flex flex-wrap justify-content-center gap-3'>
            {products.map((product:any, index:number) => (
                <ProductCard key={generateId()} dataProduct={product} setIdProduct={setIdProduct} />
            ))}
        </div>
    </div>
  )
}

export default ProductsCatalog