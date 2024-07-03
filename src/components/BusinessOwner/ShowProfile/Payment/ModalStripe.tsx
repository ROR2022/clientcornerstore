import { FC, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import StripePayment from "./StripePayment";
import { useMediaQuery } from "usehooks-ts";

interface ModalStripeProps {
  showModalStripe: boolean;
  setShowModalStripe: (showModalStripe: boolean) => void;
  emailUser: string;
  dataIdSale: string;
}

const ModalStripe: FC<ModalStripeProps> = ({
  showModalStripe,
  setShowModalStripe,
  emailUser,
  dataIdSale,
}) => {
  const isDesktop = useMediaQuery("(min-width: 992px)");

  const handleClose = () => {
    setShowModalStripe(false);
  };

  useEffect(() => {
    //console.log('emailUser(BO):...', emailUser);
  }, [emailUser]);

  return (
    <Modal
      style={{ maxHeight: "83vh", marginTop: isDesktop ? "14vh" : "10vh" }}
      className="bg-info bg-opacity-10"
      show={showModalStripe}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="alert alert-success">Payment:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StripePayment emailBO={emailUser} dataIdSale={dataIdSale} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-start">
        <Button variant="secondary" onClick={handleClose}>
          <IoClose />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStripe;
