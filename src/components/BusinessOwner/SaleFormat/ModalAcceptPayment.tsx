import { FC, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { createSale } from "@/api/apiSales";
import { Spinner } from "react-bootstrap";

interface ModalAcceptPaymentProps {
  showModalPayment: boolean;
  setShowModalPayment: (showModalPayment: boolean) => void;
  dataSale: any;
  accessToken: string;
  handleClearSale: () => void;
}

const ModalAcceptPayment: FC<ModalAcceptPaymentProps> = ({
  showModalPayment,
  setShowModalPayment,
  dataSale,
  accessToken,
  handleClearSale,
}) => {
  const [change, setChange] = useState(0);
  const [cash, setCash] = useState(0);
  const [errorPayment, setErrorPayment] = useState('');
  const [successPayment, setSuccessPayment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(cash>=dataSale.total){
        setErrorPayment('');
    }
  },[cash]);

  const calculateChange = (e: any) => {
    const cashTemp = e.target.value;
    let tempChange = cashTemp - dataSale.total;
    if (tempChange < 0) {
      tempChange = 0;
    }
    setChange(tempChange);
    setCash(cashTemp);
  };
  const handleClose = () => setShowModalPayment(false);
  const formatMyNumber = (num: number) => {
    return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };
  const handlePayment = async () => {

    //primero se debe checar que el cash sea mayor o igual al total de la venta
    if (cash < dataSale.total) {
      //alert("The cash amount is less than the total amount of the sale");
        setErrorPayment("The cash amount is less than the total amount of the sale");
      return;
    }

    //aqui se debe guardar la venta en la base de datos
    console.log("dataSale:..", dataSale);
    //se debe agregar el status de la venta como succeded
    /*
        paymentStatus: 'succeeded';
        paymentMethod: 'cash';
        */
    dataSale.paymentStatus = "succeeded";
    dataSale.paymentMethod = "cash";
    try {
        setLoading(true);
      const result = await createSale(dataSale, accessToken);
      console.log("result:..", result);
      const { businessOwner}=result;
      if(businessOwner){
        setSuccessPayment("Sale created successfully");
        setTimeout(() => {
            setLoading(false);
            handleClearSale();
            handleClose();
        }, 1000);
        
      }else{
        setErrorPayment("Error creating the sale");
        setLoading(false);
      }
      
    } catch (error) {
      console.log("error:..", error);
    }
  };
  return (
    <Modal show={showModalPayment} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="alert alert-success">
          Accepting Payment:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Amount: {formatMyNumber(dataSale.total)}</p>
        <div className="d-flex gap-1 align-items-center justify-content-center">
          <p className="form-label">Cash:</p>
          <input
            type="number"
            placeholder="$"
            className="form-control"
            onChange={calculateChange}
          />
        </div>
        <p className="my-2">Change: {formatMyNumber(change)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePayment}>
          {loading && <Spinner animation="border" role="status" />}
            {!loading && <span>Accept Payment</span>}
        </Button>
        {successPayment && <p className="text-success d-block">{successPayment}</p>}
        {errorPayment && <p className="text-danger">{errorPayment}</p>}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAcceptPayment;
