"use client";
import { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import MainModal from '../MainModal/MainModal';
import UploadImage from '@/components/UploadImage/UploadImage';
//importaremos el icono de una imagen para el producto que se va a subir
import { FaImage, FaPrint, FaDownload, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
//import Link from 'next/link';
import ScanCode from './ScanCode';
import CreateQRcode from './CreateQRcode';
import CreateBarCode from './CreateBarCode';
import CodeGenerator from './CodeGenerator';
import { createProduct, getProductById, updateProduct } from '@/api/apiProduct'
//importar el icono de la camara para poder escanear el codigo de barras o qr
import { AiOutlineCamera } from 'react-icons/ai';
import SelectProduct from './SelectProduct';
import ModalScanCode from './ModalScanCode';
import FormDataProduct from './FormDataProduct';
import ModalSearchProduct from './ModalSearchProduct';
import { useMediaQuery } from 'usehooks-ts';


const initDataProduct = {
  name: '',
  price: 0,
  description: '',
  stock: 0,
  category: '',
  imageUrl: '',
  qrCodeUrl: '',
  barCodeUrl: '',
  businessOwner: ''
}

const AddEditProduct = () => {
  const [dataFormProduct, setDataFormProduct] = useState(initDataProduct);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [valueScanner, setValueScanner] = useState('');
  const [dataIdProduct, setDataIdProduct] = useState('');
  const [imageProduct, setImageProduct] = useState(null);
  const [qrCodeProduct, setQrCodeProduct] = useState(null);
  const [barCodeProduct, setBarCodeProduct] = useState(null);
  const router = useRouter();
  const { dataLocalStorage } = useContext(MyContext);
  const [initialFormikValues, setInitialFormikValues] = useState<any>(initDataProduct);
  const [loading, setLoading] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  if(isMobile){
    console.log('isMobile:..',isMobile);
  }

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    price: yup.number().required('Price is required'),
    description: yup.string().required('Description is required'),
    stock: yup.number().required('Stock is required'),
    category: yup.string().required('Category is required'),
  });

  useEffect(() => {
    //console.log('valueScanner:..', valueScanner);
    if (valueScanner !== '') {
      setDataIdProduct(valueScanner);
      //setShowScanner(false);
      getDataProduct(valueScanner);
    }
  }, [valueScanner])


  useEffect(() => {
    //console.log('dataIdProduct(ambos):..', dataIdProduct);
    //console.log('initialFormikValues(ambos):..', initialFormikValues);
    //console.log('showEditProduct(ambos):..', showEditProduct);
    if (dataIdProduct !== '' && initialFormikValues.name !== '') {
      //console.log('showEditProduct(--- se supone que se activa ---):..');
      setShowEditProduct(true);
      //getDataProduct(dataIdProduct);
    }
    if (dataIdProduct !== '' && initialFormikValues.name === '') {
      //console.log('getDataProduct(dataIdProduct):..', dataIdProduct);
      getDataProduct(dataIdProduct);
      //setShowEditProduct(false);
    }
  }, [dataIdProduct, initialFormikValues, showEditProduct])

  useEffect(() => {
    //console.log('dataIdProduct:..', dataIdProduct);
    if (dataIdProduct !== '') {
      //console.log('getDataProduct(dataIdProduct):..', dataIdProduct);

      getDataProduct(dataIdProduct);
    }
  }, [dataIdProduct])

  

  const handleSaveProduct = async (values: any) => {
    console.log('Create/Update Product:..', values);

    try {
      let dataValues = null;
      //checar que si hay una imagen y que no sea un string
      if (imageProduct && typeof imageProduct !== 'string') {
        dataValues = new FormData();
        dataValues.append('file', imageProduct);
        for (const key in values) {
          dataValues.append(key, values[key]);
        }
      } else {
        dataValues = { ...values };
      }
      let result = null;
      //console.log('dataIdProduct:..', dataIdProduct);
      setLoading(true);
      if (dataIdProduct === '') {
        result = await createProduct(dataValues, dataLocalStorage.access_token);
      } else {
        console.log('Editando producto...dataValues:..', dataValues);
        //return;
        result = await updateProduct(dataValues, dataLocalStorage.access_token, dataIdProduct);
      }
      setLoading(false);
      //console.log('resultCreateUpdateProduct:..', result);
      const { dataProduct } = result;
      if (dataProduct) {
        setSuccessModal(true);
        setQrCodeProduct(result.dataProduct.qrCodeUrl);
        setBarCodeProduct(result.dataProduct.barCodeUrl);
        return;
      }
      const {_id} = result;
      if (_id) {
        setSuccessModal(true);
        setQrCodeProduct(result.qrCodeUrl);
        setBarCodeProduct(result.barCodeUrl);
        return;
      }
       
        setErrorModal(true);
        console.log('Error CreateUpdateProduct:..', result);
        if (result.response.data.message) {
          console.log('Error CreateUpdateProduct:..' + result.response.data.message);
        }
      
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const getDataProduct = async (idProduct: string) => {
    console.log('idProduct:..', idProduct);
    try {
      //hacer la busqueda del producto por el id
      setLoading(true);
      const result = await getProductById(idProduct);
      console.log('resultProduct:..', result);
      if (result) {
        setInitialFormikValues({
          name: result.name,
          price: result.price,
          description: result.description,
          stock: result.stock,
          category: result.category,
          imageUrl: result.imageUrl,
          qrCodeUrl: result.qrCodeUrl,
          barCodeUrl: result.barCodeUrl,
          businessOwner: result.businessOwner
        });
        setDataFormProduct(result);
        setImageProduct(result.imageUrl);
        setQrCodeProduct(result.qrCodeUrl);
        setBarCodeProduct(result.barCodeUrl);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);

    }
  }

  const toggleScanner = () => {
    setValueScanner('');
    setShowScanner(true);
  }

  const handlePrint = (name: any) => {
    //implementar la impresion de la imagen apartir de la url en el name
    //console.log('Print:..', name);
    //console.log('dataProduct:..', dataProduct);
    const urlImage = initialFormikValues[name];
    //console.log('urlImage:..', urlImage);
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`<img src="${urlImage}" onload="window.print();" />`);
    printWindow?.document.close();
  }
  const handleDownload = (name: any) => {
    //implementar la descarga de la imagen apartir de la url en el name
    //console.log('Download:..', name);
    const urlImage = initialFormikValues[name];
    const link = document.createElement('a');
    link.href = urlImage;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleShowModalSearch = () => {
    setDataIdProduct('');
    setShowModalSearch(true);
  }

  return (
    <div className='my-2'>

      <div className='card w-75 my-2 p-2 me-auto ms-auto'>
        <h5>Search Product to Edit:</h5>
        <h6 className='alert alert-success d-none'>idProduct:{dataIdProduct}</h6>
        <div className='d-flex flex-wrap gap-2 justify-content-center align-items-center'>
          <div className={'w-100'}>
            <SelectProduct emailUser={dataLocalStorage.email} dataIdProduct={dataIdProduct} setDataIdProduct={setDataIdProduct} />
          </div>
          
          <Button onClick={toggleScanner} className='btn btn-light'><AiOutlineCamera /></Button>
          <Button onClick={handleShowModalSearch} className='btn btn-light'><FaSearch /></Button>
          
        </div>
        {showScanner && <ModalScanCode showModal={showScanner} setShowModal={setShowScanner} valueScanner={valueScanner} setValueScanner={setValueScanner} />}
        {showModalSearch && <ModalSearchProduct emailUser={dataLocalStorage.email} showModalSearch={showModalSearch} setShowModalSearch={setShowModalSearch} setDataIdProduct={setDataIdProduct} dataIdProduct={dataIdProduct} />}
      </div>


      <h6 className='alert alert-info text-center my-2'>Please do not forget Save changes</h6>
      <div className='w-100 d-flex justify-content-center my-3'>
        <Spinner animation="border" variant="primary" className={loading ? 'd-block' : 'd-none'} />
      </div>
      <h2 className='text-center fs-1'>
        {dataIdProduct !== '' ? 'EDIT ' : 'ADD '}
        PRODUCT
      </h2>
      <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
        {!imageProduct &&
          <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
            <FaImage className='text-center' style={{ fontSize: '200px' }} />
            <p className='text-center'>Please upload an image</p>
          </div>
        }

        <div className='ms-auto me-auto d-block'>
          <UploadImage setDataImg={setImageProduct} dataImg={imageProduct} />
        </div>


        
          <FormDataProduct
          initialFormikValues={initialFormikValues}
          schema={schema}
          handleSaveProduct={handleSaveProduct}
          loading={loading}
          dataIdProduct={dataIdProduct}
        />
        
        

        {successModal && <MainModal dataModal={{showModal:successModal, setShowModal:setSuccessModal, title:'Success', text:'Product changes has been saved successfully', severity:'success'}} />}
        {errorModal && <MainModal dataModal={{showModal:errorModal, setShowModal:setErrorModal, title:'Error', text:'An error occurred while saving the product', severity:'danger'}} />}


        <div className='d-flex flex-wrap justify-content-center align-items-center gap-3'>
          {qrCodeProduct && <div className='card p-2 d-flex flex-column justify-content-center align-items-center gap-1'>
            <img src={qrCodeProduct} alt="qrCode" width={'100%'} />
            <div className='d-flex gap-2 justify-content-center align-items-center'>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id={`tooltip-top-print`}>Print</Tooltip>}
              >
                <button type='button' onClick={() => handlePrint('qrCodeUrl')} className='btn btn-primary'>
                  <FaPrint />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id={`tooltip-top`}>DownLoad</Tooltip>}
              >
                <button type='button' onClick={() => handleDownload('qrCodeUrl')} className='btn btn-success'>
                  <FaDownload />
                </button>
              </OverlayTrigger>
            </div>
          </div>}
          {barCodeProduct && <div className='card p-2 d-flex flex-column justify-content-center align-items-center gap-1'>
            <img src={barCodeProduct} alt="barCode" width={'100%'} />
            <div className='d-flex gap-2 justify-content-center align-items-center'>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id={`tooltip-top-print`}>Print</Tooltip>}
              >
                <button type='button' onClick={() => handlePrint('barCodeUrl')} className='btn btn-primary'>

                  <FaPrint />


                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id={`tooltip-top`}>DownLoad</Tooltip>}
              >
                <button type='button' onClick={() => handleDownload('barCodeUrl')} className='btn btn-success'>


                  <FaDownload />


                </button>
              </OverlayTrigger>
            </div>
          </div>}
        </div>

      </div>
    </div>
  )
}

export default AddEditProduct