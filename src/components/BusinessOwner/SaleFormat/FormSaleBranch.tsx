"use client";
import {useEffect,useState} from 'react'
import { useContext } from 'react'
import  MyContext  from '@/context/MyContext'
import { Button } from 'react-bootstrap';
import FormHeaderData from './FormHeaderData';
import dynamic from 'next/dynamic';
const SelectProduct = dynamic(() => import('@/components/Product/SelectProduct'), { ssr: false });
//import SelectProduct from '@/components/Product/SelectProduct';
import { AiOutlineCamera } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import ModalScanCode from '@/components/Product/ModalScanCode';
import ModalSearchProduct from '@/components/Product/ModalSearchProduct';
//import { useSearchParams } from 'next/navigation';
import CardShoppingCart from '../ShowProfile/CardShoppingCart';
import { getProductById } from '@/api/apiProduct';
//importar el icono de close para cerrar el modal de react-icons
import { IoClose } from 'react-icons/io5';
import ModalAcceptPayment from './ModalAcceptPayment';

const initDataHeaderSales = {
    branch: null,
    manager: null,
    supervisor: null,
    cashier: null,
}

const FormSaleBranch = () => {
    const {dataLocalStorage, dataLocalStorageShoppingCart, setDataLocalStorageShoppingCart} = useContext(MyContext);
    const [dataHeaderSales, setDataHeaderSales] = useState<any>(initDataHeaderSales);
    const [dataIdProduct, setDataIdProduct] = useState<any>('');
    const [showScanner, setShowScanner] = useState(false);
    const [errorValidation, setErrorValidation] = useState('');
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [showModalPayment, setShowModalPayment] = useState(false);
    const [total, setTotal] = useState(0);
    const [dataSale, setDataSale] = useState<any>({});
    const [emailUser, setEmailUser] = useState('');
    //const searchParams = useSearchParams();
    //const emailUser = searchParams.get('businessOwner') || '';

    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
        setEmailUser(searchParams.get('businessOwner') || '');
    }, []);

    useEffect(() => {
        //console.log('dataLocalStorage:..',dataLocalStorage);
    }, [dataLocalStorage]);

    useEffect(() => {
        /* console.log(
          "dataLocalStorageShoppingCart:...",
          dataLocalStorageShoppingCart
        ); */
        calculateTotal();
      }, [dataLocalStorageShoppingCart]);
      useEffect(() => {
        //verificar si el id del producto ya esta en el carrito de compras para no agregarlo de nuevo
        //pero si no esta se agrega al carrito de compras
        if (dataIdProduct === "") {
          return;
        }
        const dataProduct = dataLocalStorageShoppingCart.find(
          (item: any) => item._id === dataIdProduct
        );
        if (dataProduct) {
          const tempShoppingCart = dataLocalStorageShoppingCart.map((item: any) => {
            if (item._id === dataIdProduct) {
              item.units += 1;
            }
            return item;
          });
          setDataLocalStorageShoppingCart(tempShoppingCart);
        } else {
          agregarDataProduct(dataIdProduct);
        }
      }, [dataIdProduct]);
      const agregarDataProduct = async (idProduct: string) => {
        //console.log('idProduct:...', idProduct);
        //console.log('emailUser:...', emailUser
        try {
          const result = await getProductById(idProduct);
          console.log("result(getProductById):...", result);
          const dataProduct = result;
          console.log("dataProduct:...", dataProduct);
          const tempDataProduct = { ...dataProduct, units: 1 };
          //verificar si el producto ya esta en el carrito de compras
          //si esta se actualiza la cantidad de unidades
          //si no esta se agrega al carrito de compras
          const dataProductInCart = dataLocalStorageShoppingCart.find(
            (item: any) => item._id === idProduct
          );
          if (dataProductInCart) {
            const tempShoppingCart = dataLocalStorageShoppingCart.map(
              (item: any) => {
                if (item._id === idProduct) {
                  item.units += 1;
                }
                return item;
              }
            );
            setDataLocalStorageShoppingCart(tempShoppingCart);
          } else {
            setDataLocalStorageShoppingCart([
              ...dataLocalStorageShoppingCart,
              tempDataProduct,
            ]);
          }
        } catch (error) {
          console.log("error:...", error);
        }
      };

      const handlePayment = async() => {
        try {
            console.log("handlePayment:...");
        console.log('dataLocalStorageShoppingCart:...',dataLocalStorageShoppingCart);
        console.log('total:...',total);
        console.log('dataHeaderSales:...',dataHeaderSales);
        //primero checamos si hay productos en el carrito de compras
        if (dataLocalStorageShoppingCart.length === 0) {
          console.log("No hay productos en el carrito de compras");
          setErrorValidation("No products in the sale");
          return;
        }
        //ahora checamos si estan todos los datos del encabezado de la venta
        if (
          dataHeaderSales.branch === null ||
          dataHeaderSales.manager === null ||
          dataHeaderSales.supervisor === null ||
            dataHeaderSales.cashier === null
        ) {
          console.log("Faltan datos del encabezado de la venta");
          setErrorValidation("Please complete the sales header data");
          return;
        }
        //ahora preparamos la venta
        let dataSaleTemp={
            branch: dataHeaderSales.branch.value,
            manager: dataHeaderSales.manager.value,
            supervisor: dataHeaderSales.supervisor.value,
            cashier: dataHeaderSales.cashier.value,
            total: total,
            products: dataLocalStorageShoppingCart,
            businessOwner: dataLocalStorage.businessOwner
        }
            setDataSale(dataSaleTemp);
            setShowModalPayment(true);

        } catch (error) {
            console.log('error:...',error);
        }
        

        //setShowModalPayment(true);
      }
      const handleEmptyCart = () => {
        setDataIdProduct("");
        setDataLocalStorageShoppingCart([]);
      };
    
      const handleShowScanner = () => {
        setDataIdProduct("");
        setShowScanner(true);
      };
    
      const handleShowModalSearch = () => {
        setDataIdProduct("");
        setShowModalSearch(true);
      };
    const calculateTotal = () => {
        const total = dataLocalStorageShoppingCart.reduce(
          (acc: any, item: any) => acc + item.price * item.units,
          0
        );
        setTotal(total);
      };
    
      const formatMyNumber = (num: number) => {
        return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
      };

      const handleClearSale = () => {
        setDataIdProduct("");
        setDataLocalStorageShoppingCart([]);
        setDataHeaderSales(initDataHeaderSales);
      }

  return (
    <div>
        <FormHeaderData dataHeaderSales={dataHeaderSales} setDataHeaderSales={setDataHeaderSales}/>
        <div className="card w-75 my-2 p-2 me-auto ms-auto">
          <h5>Search Product:</h5>
          <h6 className="alert alert-success d-none">
            idProduct:{dataIdProduct}
          </h6>
          <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
            <div className={"w-100"}>
              <SelectProduct
                emailUser={emailUser}
                dataIdProduct={dataIdProduct}
                setDataIdProduct={setDataIdProduct}
              />
            </div>

            <Button onClick={handleShowScanner} className="btn btn-light">
              <AiOutlineCamera />
            </Button>
            <Button onClick={handleShowModalSearch} className="btn btn-light">
              <FaSearch />
            </Button>
          </div>
          {showScanner && (
            <ModalScanCode
              showModal={showScanner}
              setShowModal={setShowScanner}
              valueScanner={dataIdProduct}
              setValueScanner={setDataIdProduct}
            />
          )}
          {showModalSearch && (
            <ModalSearchProduct
              emailUser={emailUser}
              showModalSearch={showModalSearch}
              setShowModalSearch={setShowModalSearch}
              setDataIdProduct={setDataIdProduct}
              dataIdProduct={dataIdProduct}
            />
          )}
        </div>   
          {showModalPayment && (
            <ModalAcceptPayment
              showModalPayment={showModalPayment}
              setShowModalPayment={setShowModalPayment}
              dataSale={dataSale}
              accessToken={dataLocalStorage.access_token}
              handleClearSale={handleClearSale}
            />
          
          )}
        {dataLocalStorageShoppingCart.length === 0 && (
            <h3 className='alert alert-danger text-center my-2 w-50 me-auto ms-auto'>No products added</h3>
          )}
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {dataLocalStorageShoppingCart.map(
              (dataProduct: any, index: number) => (
                <CardShoppingCart
                  key={dataProduct._id}
                  itemShoppingCart={dataProduct}
                />
              )
            )}
          </div>
          {dataLocalStorageShoppingCart.length > 0 && (
            <>
              <div className="my-2 w-75 d-flex justify-content-between border rounded p-2 ms-auto me-auto">
                <h3>Total: </h3>
                <h3>{formatMyNumber(total)}</h3>
              </div>
                <div className=' d-flex gap-3 justify-content-center align-items-center my-2'>
              <Button
                className=""
                variant="outline-danger"
                onClick={handleEmptyCart}
              >
                Empty Sale
              </Button>
              <Button
                className=""
                variant="primary"
                onClick={handlePayment}
              >
                Payment
              </Button>
              </div>
            </>
          )}
          {errorValidation !== "" && (
            <div className='d-flex gap-2 w-50 justify-content-center align-items-center ms-auto me-auto'>
            <h6 className="alert alert-danger text-center">
                {errorValidation}
                <span onClick={()=>setErrorValidation('')} className='btn btn-outline-secondary ms-1'><IoClose/></span>
                </h6>
            
            </div>
            )}

    </div>
  )
}

export default FormSaleBranch