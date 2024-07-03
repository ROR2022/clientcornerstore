import { FC, useState, useEffect, use } from "react";
import { Modal, Button } from "react-bootstrap";
import MyContext from "@/context/MyContext";
import { useContext } from "react";
import TableShoppingCart from "./TableShoppingCart";
import CardShoppingCart from "./CardShoppingCart";
import { AiOutlineCamera } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import ModalSearchProduct from "@/components/Product/ModalSearchProduct";
import SelectProduct from "@/components/Product/SelectProduct";
import ModalScanCode from "@/components/Product/ModalScanCode";
import { getProductById } from "@/api/apiProduct";
import { createSale } from "@/api/apiSales";
import { useMediaQuery } from "usehooks-ts";
//importaremos el icono de close para cerrar el modal de react-icons
import { IoClose } from "react-icons/io5";
import ModalStripe from "./Payment/ModalStripe";

interface ModalShoppingCartProps {
  showModalShoppingCart: boolean;
  setShowModalShoppingCart: (showModalShoppingCart: boolean) => void;
  emailUser: string;
}

const ModalShoppingCart: FC<ModalShoppingCartProps> = ({
  emailUser,
  showModalShoppingCart,
  setShowModalShoppingCart,
}) => {
  const {
    dataLocalStorage,
    setDataLocalStorage,
    dataLocalStorageShoppingCart,
    setDataLocalStorageShoppingCart,
  } = useContext(MyContext);
  const [dataIdProduct, setDataIdProduct] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [valueScanner, setValueScanner] = useState("");
  const [total, setTotal] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [dataIdSale, setDataIdSale] = useState("");

  useEffect(() => {
    console.log(
      "dataLocalStorageShoppingCart:...",
      dataLocalStorageShoppingCart
    );
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

  useEffect(() => {
    //console.log('dataLocalStorage:...', dataLocalStorage);
  }, [dataLocalStorage]);

  const handlePayment = async () => {
    //se deben preparar los datos para generar el objeto venta
    const mySale = {
      emailBusinessOwner: emailUser,
      businessOwner: dataLocalStorage.businessOwner,
      products: dataLocalStorageShoppingCart,
      emailClient: dataLocalStorage.email,
      paymentStatus: "pending",
    };
    const resultCreateSale = await createSale(
      mySale,
      dataLocalStorage.access_token
    );
    console.log("resultCreateSale:...", resultCreateSale);
    const idSale = String(resultCreateSale._id);
    setDataIdSale(idSale);
    //setDataSale(mySale);
    if (dataLocalStorageShoppingCart.length === 0) {
      console.log("No products in the shopping cart");
      return;
    }
    if (dataLocalStorage.dataPayment !== null) {
      setDataLocalStorage({ ...dataLocalStorage, dataPayment: null });
    }
    setShowModalPayment(true);
  };

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

  const handleClose = () => setShowModalShoppingCart(false);
  return (
    <div>
      <Modal
        style={{ maxHeight: "83vh", marginTop: isDesktop ? "14vh" : "10vh" }}
        show={showModalShoppingCart}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={"alert alert-success"}>Shopping Cart:</span>
          </Modal.Title>
        </Modal.Header>
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
        <Modal.Body>
          {/* <TableShoppingCart dataTableShoppingCart={dataLocalStorageShoppingCart} /> */}
          {dataLocalStorageShoppingCart.length === 0 && (
            <h3>No products in the shopping cart</h3>
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
              <div className="my-2 w-100 d-flex justify-content-between border rounded p-2">
                <h3>Total: </h3>
                <h3>{formatMyNumber(total)}</h3>
              </div>

              <Button
                className="d-block ms-auto my-2"
                variant="primary"
                onClick={handlePayment}
              >
                Payment
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button variant="secondary" onClick={handleClose}>
            <IoClose />
          </Button>
          {dataLocalStorageShoppingCart.length > 0 && (
            <>
              <Button variant="danger" onClick={handleEmptyCart}>
                Empty Cart
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      {showModalPayment && (
        <ModalStripe
          showModalStripe={showModalPayment}
          setShowModalStripe={setShowModalPayment}
          emailUser={emailUser}
          dataIdSale={dataIdSale}
        />
      )}
    </div>
  );
};

export default ModalShoppingCart;
