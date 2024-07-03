import {FC, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'
import ProductsCatalog from '../BusinessOwner/ShowProfile/ProductsCatalog';

interface ModalSearchProductProps {
    showModalSearch: boolean;
    setShowModalSearch: (showModalSearch: boolean) => void;
    dataIdProduct: string;
    setDataIdProduct: (dataIdProduct: any) => void;
    emailUser: string;
    }


const ModalSearchProduct: FC<ModalSearchProductProps> = ({ emailUser,showModalSearch, setShowModalSearch, setDataIdProduct, dataIdProduct}) => {

    useEffect(() => {
        //console.log('emailUser:...', emailUser);
        if(dataIdProduct!==''){
            setShowModalSearch(false);
        }
    }, [dataIdProduct]);

    const handleClose = () => setShowModalSearch(false);
    //const handleShow = () => setShowModalSearch(true);


  return (
    <div>
        <Modal style={{maxHeight:'83vh', marginTop:'10vh'}} show={showModalSearch} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>
      <span className={'alert alert-success'}>Search Product ID:</span>  
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <ProductsCatalog emailUser={emailUser} setIdProduct={setDataIdProduct}/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal></div>
  )
}

export default ModalSearchProduct