import { FC, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
//import ProductCard from "@/components/BusinessOwner/ShowProfile/ProductCard";
import CardShoppingCart from "@/components/BusinessOwner/ShowProfile/CardShoppingCart";

interface IModalDataSale {
  showModal: boolean;
  setShowModal: any;
  dataSelectedSale: any;
}

const ModalDataSale: FC<IModalDataSale> = ({
  showModal,
  setShowModal,
  dataSelectedSale,
}) => {
  const handleClose = () => setShowModal(false);
  const formatNumer= (num:number) => {
    //retornaremos el numero con dos decimales y el signo de pesos
    return `$${num.toFixed(2)}`
  }
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="alert alert-success">Data Sale:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Id: {dataSelectedSale?._id}</p>
        <p>Date: {dataSelectedSale?.createdAt}</p>
        <p>Payment Method: {dataSelectedSale?.paymentMethod || 'card'}</p>
        <p>Total: {formatNumer(dataSelectedSale?.total)}</p>
        <div>
          Products:
          <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
          {dataSelectedSale?.products.map((product: any) => (
            <CardShoppingCart
              key={product.id}
              itemShoppingCart={product}
              isDisabled={true}
            />
          ))}
          </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDataSale;
