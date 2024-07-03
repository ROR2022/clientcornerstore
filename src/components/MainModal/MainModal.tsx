"use client";
import {FC} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface DataModalType {
      showModal: boolean;
      setShowModal: (showModal:boolean)=>void;
      title: string;
      text: string;
      severity: string;
}

interface MainModalType {
  dataModal: DataModalType;
}

const MainModal: FC<MainModalType> = ({dataModal}) => {
    const {showModal, setShowModal, title, text, severity} = dataModal
    const handleClose = () => setShowModal(false);
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showModal} onHide={handleClose}  centered>
        <Modal.Header closeButton>
          <Modal.Title >
            <span className={severity==='success'?'alert alert-success':'alert alert-danger'}>{title}</span>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {text}
        </Modal.Body>

        <Modal.Footer>
          <Button type='button' onClick={handleClose} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}




export default MainModal