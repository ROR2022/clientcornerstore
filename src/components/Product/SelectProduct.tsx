import { getIdsProductsByBusinessOwner, searchIdsProductsByQuery } from '@/api/apiProduct';
import {FC,useEffect, useState} from 'react'
//import { Spinner } from 'react-bootstrap';
import  Select  from 'react-select';

interface SelectProductProps {
    emailUser: string;
    dataIdProduct: string;
    setDataIdProduct: (data: any) => void;
    }

    const initOptions = [ { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
        ];
        const initValue = { value: "enter id", label: "enter id" };

const SelectProduct: FC<SelectProductProps> = ({emailUser, dataIdProduct, setDataIdProduct}) => {
    //const [dataProduct, setDataProduct] = useState<any>([]);
    //const [loading, setLoading] = useState(false);
    const[dataOptions,setDataOptions]=useState(initOptions);
    const[valueSelect,setValueSelect]=useState(initValue);

    useEffect(() => {
        //console.log('dataIdProduct:..',dataIdProduct);
        if(dataIdProduct!==''){
            setValueSelect({value:dataIdProduct,label:`${dataIdProduct}`});
        }else{
            setValueSelect(initValue);
        }
    }, [dataIdProduct])

    useEffect(() => {
        handleSearchProduct('');
    }, [])

    const handleChange = (selectedOption:{value:string,label:string} | typeof initValue | null) => {

        if(selectedOption === null){
            setValueSelect(initValue);
            return;
        }
        //console.log(estado)
        
        setValueSelect(selectedOption);
        //handleChangeCity(selectedOption.value);
        setDataIdProduct(selectedOption.value);
    }


    const handleSearchProduct = async (value: string) => {
        //console.log('searching product:..', value);
        if (value === '') {
            //hacer una busqueda de los primeros 10 productos
            try {
                const result = await getIdsProductsByBusinessOwner(emailUser);
                console.log('result(products by business owner):..',result);
                const { dataProducts } = result;
                if (dataProducts) {
                    //setDataProduct(result?.dataProducts);
                    const tempOptions = dataProducts.map((product: any) => {
                        return { value: product._id, label: `${product._id} - ${product.name}` }
                    });
                    setDataOptions([...tempOptions]);
                }
            } catch (error) {
                console.log('Error:..', error)
            }
            return;
        }
        if(value.length>2){
            //setLoading(true);
            //hacer la busqueda de los productos que coincidan con el criterio de busqueda
            try {
                const result = await searchIdsProductsByQuery(value);
                console.log('resultSearchProduct:..', result);
                if (result.dataProduct) {
                    //setDataProduct(result.dataProduct);
                }
            } catch (error) {
                console.log(error);
            } finally {
                //setLoading(false);
            }
        }
    }

  return (
    <div><Select
    styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'grey' : 'red',
        }),
      }}
    value={valueSelect}
    className="w-100 me-auto ms-auto my-2"
    options={dataOptions}
    placeholder="enter id"
    onChange={(option)=>handleChange(option)}
    /></div>
  )
}

export default SelectProduct