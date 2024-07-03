import {FC,useState,useEffect, use} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScanCode from './ScanCode';

interface ModalScanCodeProps {
    showModal: boolean;
    setShowModal: (data: any) => void;
    valueScanner: string;
  setValueScanner: (data: any) => void;
}

const ModalScanCode:FC<ModalScanCodeProps> = ({showModal,setShowModal,valueScanner,setValueScanner}) => {
  //const [showModal, setShowModal] = useState(true);
  const handleClose = () => setShowModal(false);
  useEffect(() => {
    if(showModal===false){
        setShowModal(true);
    }
}, []);

  useEffect(() => {
    console.log('valueScanner:..',valueScanner);
    if(valueScanner !== ''){
      setShowModal(false);
    }
  }, [valueScanner])
  return (
    <div><Modal show={showModal} onHide={handleClose} centered >
    <Modal.Header closeButton>
      <Modal.Title >
        <span className={'alert alert-success'}>Scan Code</span>
        </Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <ScanCode valueScanner={valueScanner} setValueScanner={setValueScanner} />
    </Modal.Body>

    <Modal.Footer>
      <Button type='button' onClick={handleClose} variant="secondary">Close</Button>
    </Modal.Footer>
  </Modal></div>
  )
}

export default ModalScanCode