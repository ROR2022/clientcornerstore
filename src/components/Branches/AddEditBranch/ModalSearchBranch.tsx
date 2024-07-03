import {FC, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'
import BranchesCatalog from './BranchesCatalog'

interface ModalSearchBranchProps {
    emailBusinessOwner: string;
    showModalSearch: boolean;
    setShowModalSearch: (showModalSearch: boolean) => void;
    setDataIdBranch: (dataIdBranch: any) => void;
    dataIdBranch: any;
    isEmployee?: boolean;
}

const ModalSearchBranch:FC<ModalSearchBranchProps> = ({
    emailBusinessOwner,
    showModalSearch,
    setShowModalSearch,
    setDataIdBranch,
    dataIdBranch,
    isEmployee
}) => {
  useEffect(() => {
    //console.log('dataIdBranch:', dataIdBranch);
    if(dataIdBranch!==''){
        setShowModalSearch(false);
    }
  },[dataIdBranch]);

    const handleClose = () => setShowModalSearch(false);
  return (
    <div>
        <Modal style={{maxHeight:'83vh', marginTop:'10vh'}} 
        show={showModalSearch} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>
      <span className={'alert alert-success'}>Search {isEmployee===true?'Employee:':'Branch:'}</span>  
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <BranchesCatalog emailBusinessOwner={emailBusinessOwner} setDataIdBranch={setDataIdBranch} isEmployee={true}/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
        </div>
  )
}

export default ModalSearchBranch