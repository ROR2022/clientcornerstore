import { FC, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
//importaremos el icono del carrito de compras de la libreria de react-icons
import { FaShoppingCart } from "react-icons/fa";
import ModalShoppingCart from "./ModalShoppingCart";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import Link from "next/link";
// importaremos el icono del menu de barras de la libreria de react-icons
import {
  FaBars,
  FaPhoneAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useMediaQuery } from "usehooks-ts";
//importaremos el icono de usuario de la libreria de react-icons
import { BsPerson } from "react-icons/bs";

interface NavBarProfileProps {
  dataBusinessOwner: any;
}
//vscode.typescript-language-features

const NavBarProfile: FC<NavBarProfileProps> = ({ dataBusinessOwner }) => {
  const {
    email,
    name,
    lastName,
    businessName,
    businessDescription,
    businessCategory,
    businessAddress,
    businessPhone,
    businessEmail,
    businessImageUrl,
    businessQrCodeUrl,
    businessBarCodeUrl,
    imageUrl,
    slogan,
  } = dataBusinessOwner;
  const [showModalShoppingCart, setShowModalShoppingCart] = useState(false);
  const {
    dataLocalStorageShoppingCart,
    setDataLocalStorageShoppingCart,
    dataLocalStorage,
  } = useContext(MyContext);
  const [numberProducts, setNumberProducts] = useState(
    dataLocalStorageShoppingCart.length
  );
  const { roleId } = dataLocalStorage;
  const imgUrlClient = dataLocalStorage.imageUrl;
  const isMobile = useMediaQuery("(max-width: 991px)");

  useEffect(() => {
    //console.log('dataLocalStorageShoppingCart:...',dataLocalStorageShoppingCart);
    //numero de productos en el carrito
    setNumberProducts(dataLocalStorageShoppingCart.length);
    //console.log("numberProducts:...", dataLocalStorageShoppingCart.length);
  }, [dataLocalStorageShoppingCart]);

  const handleShowModalShoppingCart:any = () => {
    //console.log('ShowModalShoppingCart:..');
    setShowModalShoppingCart(true);
  };

  useEffect(() => {
    //console.log('dataLocalStorage:...',dataLocalStorage);
    console.log("numberProducts:...", numberProducts);
    if(numberProducts>0){
      console.log('dataShoppingCart:..', dataLocalStorageShoppingCart);
      console.log('dataLocalStorage(dataPayment):..', dataLocalStorage.dataPayment);
      console.log('dataLocalStorage(statusPayment):..', dataLocalStorage.statusPayment);
      //setShowModalShoppingCart(false);
    }
  },[numberProducts]);

  const formatGoogleUbi = () => {
    let googleUbi = `https://www.google.com/maps/search/?api=1&query=`;
    const { shortAddress, completeAddress, city, state, postalCode } =
      dataBusinessOwner;
    const tempShortAddress = shortAddress.replace(/ /g, "+");
    const tempCompleteAddress = completeAddress.replace(/ /g, "+");
    const userAddress = encodeURIComponent(
      `${tempShortAddress},+${tempCompleteAddress},+${postalCode},+${city},+${state}`
    );
    googleUbi += `${userAddress}`;
    return googleUbi;
  };
  return (
    <Navbar
      style={{ backgroundColor: "#ddd" }}
      expand="lg"
      className="rounded w-100"
    >
      <Container>
        {showModalShoppingCart && (
          <ModalShoppingCart
            emailUser={email}
            showModalShoppingCart={showModalShoppingCart}
            setShowModalShoppingCart={setShowModalShoppingCart}
          />
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className=" me-auto">
          <Navbar.Brand className="d-flex gap-2 justify-content-center align-items-start">
            <img
              src={imageUrl}
              width={"40px"}
              className="rounded"
              alt="image"
            />
            <div className="d-none d-lg-flex flex-column">
              <h3>{businessName}</h3>
              <h6 className="text-center">{slogan}</h6>
            </div>
          </Navbar.Brand>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={
              isMobile
                ? "d-flex flex-column gap-2 justify-content-center align-items-start w-100 my-2"
                : "me-auto d-flex flex-row gap-2 justify-content-center align-items-center"
            }
          >
            <div className="d-flex gap-2 my-2">
              <img
                src={imageUrl}
                style={{ width: "80px", height: "60px" }}
                className={isMobile ? "d-none" : "rounded"}
                alt="image"
              />
              <div className="d-flex flex-column gap-2">
                <h3>{businessName}</h3>
                <h6 className={isMobile ? "text-center" : "d-none"}>
                  {slogan}
                </h6>
              </div>
            </div>

            <Dropdown className="w-100">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="w-100"
              >
                <FaBars />
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-light">
                <div className="bg-light d-flex gap-2 justify-content-center">
                  <a
                    className="btn btn-light"
                    style={{ color: "inherit" }}
                    href={`tel:+52${dataBusinessOwner.phone}`}
                  >
                    <strong>
                      <FaPhoneAlt />
                    </strong>
                  </a>
                  <a
                    className="btn btn-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit" }}
                    href={formatGoogleUbi()}
                  >
                    <strong>
                      <FaMapMarkerAlt />
                    </strong>
                  </a>
                  <a
                    className="btn btn-light"
                    style={{ color: "inherit" }}
                    href={dataBusinessOwner.webSite}
                  >
                    <strong>
                      <FaGlobe />
                    </strong>
                  </a>
                  <a
                    className="btn btn-light"
                    style={{ color: "inherit" }}
                    href={dataBusinessOwner.facebook}
                  >
                    <strong>
                      <FaFacebook />
                    </strong>
                  </a>
                  <a
                    className="btn btn-light"
                    style={{ color: "inherit" }}
                    href={dataBusinessOwner.instagram}
                  >
                    <strong>
                      <FaInstagram />
                    </strong>
                  </a>
                  <a
                    className="btn btn-light"
                    style={{ color: "inherit" }}
                    href={dataBusinessOwner.twitter}
                  >
                    <strong>
                      <FaTwitter />
                    </strong>
                  </a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="w-100">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="w-100"
              >
                Sign
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-light">
                {dataLocalStorage?.email === "" || !dataLocalStorage ? (
                  <div className="bg-light">
                    <Link
                      href={`/signin?businessOwner=${email}`}
                      style={{ textDecoration: "none" }}
                      className="d-block text-secondary p-1 btn btn-light"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={`/signup/client?businessOwner=${email}&user=client`}
                      style={{ textDecoration: "none" }}
                      className="d-block text-secondary p-1 btn btn-light"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/signout"
                      style={{ textDecoration: "none" }}
                      className="d-block text-secondary p-1 btn btn-light"
                    >
                      Sign Out
                    </Link>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
        <div
          onClick={handleShowModalShoppingCart}
          className="btn btn-outline-danger ms-auto"
        >
          <FaShoppingCart />
          {numberProducts > 0 && (
            <span style={{ fontSize: "8px" }} className="badge bg-secondary">
              {numberProducts}
            </span>
          )}
        </div>
        {roleId === "client" && (
          <Dropdown style={{ width: "60px" }} className="ms-2">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              style={{ width: "60px", height: "40px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="d-flex">
                {imgUrlClient ? (
                  <img
                    src={imgUrlClient}
                    style={{ width: "35px", height: "35px" }}
                    className="rounded"
                    alt="image"
                  />
                ) : (
                  <BsPerson />
                )}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-light">
              <div className="SALUDO">
                <h6 className="text-center">
                  {dataLocalStorage?.email === "" || !dataLocalStorage
                    ? "Welcome"
                    : `Hello: ${dataLocalStorage?.businessName}`}
                </h6>
              </div>
              <div className="bg-light">
                <Link
                  href="#"
                  style={{ textDecoration: "none" }}
                  className="d-block text-secondary p-1 btn btn-light"
                >
                  Profile
                </Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBarProfile;
