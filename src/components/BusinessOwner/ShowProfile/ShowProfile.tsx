"use client";
import { useState, useEffect } from "react";
import {  useRouter } from "next/navigation";
import { getProfileUserByEmail } from "@/api/apiUsers";
import { dataThemeProfile } from "./dataThemeProfile";
import { Spinner } from "react-bootstrap";
//importaremos de react-icons los iconos para telefono, direccion, web, facebook, instagram y twitter
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import ProductsCatalog from "./ProductsCatalog";
import NavBarProfile from "./NavBarProfile";
import { useMediaQuery } from "usehooks-ts";
//importaremos el icono de whatsapp de react-icons
import { FaWhatsapp } from "react-icons/fa";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import MainModal from "@/components/MainModal/MainModal";
import { updateSale } from "@/api/apiSales";

const initDataBusinessOwner = {
  email: "",
  businessName: "",
  legalName: "",
  slogan: "",
  shortDescription: "",
  longDescription: "",
  phone: "",
  shortAddress: "",
  completeAddress: "",
  city: "",
  state: "",
  country: "México",
  postalCode: "",
  webSite: "",
  facebook: "",
  instagram: "",
  twitter: "",
  imageUrl: "",
};
//const basicGoogleUbi = 'https://www.google.com/maps/place/';
//const searchUbi = 'https://www.google.com/maps/place/Av.+Paseo+de+la+Reforma+180,+Ju%C3%A1rez,+Cuauht%C3%A9moc,+06600+Ciudad+de+M%C3%A9xico,+CDMX';
//const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(userAddress)}`;
const basicGoogleUbi = "https://www.google.com/maps/search/?api=1&query=";

const ShowProfile = () => {
  //const searchParams = useSearchParams();
  const router = useRouter();

  //const emailUser = searchParams.get("email");
  const [emailUser, setEmailUser] = useState("");
  const [searchParams, setSearchParams] = useState<any>(null);
  const [dataBusinessOwner, setDataBusinessOwner] = useState(
    initDataBusinessOwner
  );
  const [themeProfile, setThemeProfile] = useState(dataThemeProfile[1]);
  const [googleUbi, setGoogleUbi] = useState(basicGoogleUbi);
  const [errorDataUser, setErrorDataUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const [isHoveredWhatsapp, setIsHoveredWhatsapp] = useState(false);
  const {
    dataLocalStorage,
    setDataLocalStorage,
    dataLocalStorageShoppingCart,
    setDataLocalStorageShoppingCart,
  } = useContext(MyContext);
  const [dataPayment, setDataPayment] = useState<any>(null);

  useEffect(() => {
    const searchParamsTemp = new URLSearchParams(window.location.search);
    setSearchParams(searchParamsTemp);
    const emailUserTemp = searchParamsTemp.get("email");
    setEmailUser(emailUserTemp || "");
  }, []);

  useEffect(() => {
    console.log("searchParams:...", searchParams?.toString());
    //extraer de searchParams todos los valores de los parametros y guardarlos en un array temporal
    const tempSearchParams = searchParams?.toString().split("&");
    const statusPaymentTemp = searchParams?.get("redirect_status");
    const dataIdPaymentIntent = searchParams?.get("payment_intent");
    const dataIdSale = searchParams?.get("dataIdSale");

    console.log("statusPayment:...", statusPaymentTemp);
    console.log("tempSearchParams:...", tempSearchParams);
    if (statusPaymentTemp === "succeeded") {
      updateStatusSale(dataIdSale || "", dataIdPaymentIntent || "");
      setDataLocalStorage({
        ...dataLocalStorage,
        dataPayment: null,
        statusPayment: "",
      });
      setDataPayment({
        dataPayment: null,
        statusPayment: "succeeded",
      });
      setDataLocalStorageShoppingCart([]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (dataLocalStorage.dataPayment) {
      console.log("dataPayment:...", dataLocalStorage.dataPayment);
      setDataPayment({
        dataPayment: dataLocalStorage?.dataPayment,
        statusPayment: dataLocalStorage?.statusPayment,
        shoppingCart: dataLocalStorageShoppingCart,
      });
      if (dataLocalStorage?.statusPayment === "succeeded") {
        console.log("Pago exitoso");

        setDataLocalStorageShoppingCart([]);
        setDataLocalStorage({
          ...dataLocalStorage,
          dataPayment: null,
          statusPayment: "",
        });
      }
    }
  }, [dataLocalStorage.dataPayment]);

  useEffect(() => {
    //console.log("dataLocalStorage:...", dataLocalStorage);
  }, [dataLocalStorage]);

  useEffect(() => {
    console.log("++++++ dataPayment(showProfile):... +++++++", dataPayment);
    if (dataPayment?.statusPayment === "succeeded") {
      console.log("Pago exitoso");
    }

  }, [dataPayment]);

  useEffect(() => {
    if (emailUser) {
      setLoading(true);
      getProfileUserByEmail(emailUser)
        .then((res) => {
          //console.log('res(dataUser):...', res);
          if (res.error) {
            setErrorDataUser(true);
            setLoading(false);
            return;
          }
          setDataBusinessOwner(res);

          const { shortAddress, completeAddress, city, state, postalCode } =
            res;
          const tempShortAddress = shortAddress.replace(/ /g, "+");
          const tempCompleteAddress = completeAddress.replace(/ /g, "+");
          const userAddress = encodeURIComponent(
            `${tempShortAddress},+${tempCompleteAddress},+${postalCode},+${city},+${state}`
          );
          setGoogleUbi(`${basicGoogleUbi}${userAddress}`);
          setErrorDataUser(false);
          setLoading(false);
          //console.log('res:...', res);
        })
        .catch((err) => {
          console.log(err);
          setErrorDataUser(true);
          setLoading(false);
        });
    }
  }, [emailUser]);


  const updateStatusSale = async (dataIdSale: string, payment_intent:string) => {
    try {
      if(dataIdSale === '') return;
      const data= {
        paymentStatus: 'succeeded',
        paymentIntent: payment_intent
      }
      const result = await updateSale(data,dataLocalStorage.access_token,dataIdSale);
      console.log("result(updateStatusPayment):...", result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCloseModalPayment = () => {

    setDataPayment(null);
    router.push(`/business-owner/show-profile?email=${emailUser}`);
  };

  //console.log('email:..',emailUser);
  return (
    <>
      {loading && (
        <div
          style={{ minHeight: "50vh" }}
          className="d-flex justify-content-center align-items-center w-100"
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && dataBusinessOwner.email && !errorDataUser && (
        <div
          style={{
            color: themeProfile.colorText,
            backgroundColor: themeProfile.color,
          }}
          className=""
        >
          <div
            style={{ position: "fixed", zIndex: "9999999" }}
            className="HEADER w-100"
          >
            {/* <img src={dataBusinessOwner.imageUrl} width={'100px'} className='rounded' alt="image" />
            <div className='d-flex flex-column'>
              <h3>{dataBusinessOwner.businessName}</h3>
              <h6 className='text-center'>{dataBusinessOwner.slogan}</h6>
            </div> */}
            <NavBarProfile dataBusinessOwner={dataBusinessOwner} />
          </div>
          <div>
            <a
              className="btn btn-outline-success rounded-circle p-2"
              style={{
                position: "fixed",
                zIndex: "9999999",
                right: "20px",
                bottom: "40px",
                background: isHoveredWhatsapp ? "" : "#FFF",
                color: isHoveredWhatsapp ? "#FFF" : "#128c7e",
              }}
              onMouseEnter={() => setIsHoveredWhatsapp(true)}
              onMouseLeave={() => setIsHoveredWhatsapp(false)}
              href={`https://wa.me/52${dataBusinessOwner.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={50} />
            </a>
          </div>

          <div>
            <MainModal
              dataModal={{
                showModal:
                  dataPayment?.statusPayment &&
                  dataPayment?.statusPayment === "succeeded"
                    ? true
                    : false,
                setShowModal: handleCloseModalPayment,
                title: "Payment Success",
                text: "Payment was successful",
                severity: "success",
              }}
            />
          </div>
          <div>
            <MainModal
              dataModal={{
                showModal:
                  dataPayment?.statusPayment &&
                  dataPayment?.statusPayment !== "succeeded"
                    ? true
                    : false,
                setShowModal: handleCloseModalPayment,
                title: "Payment Error",
                text: `Payment was ${dataPayment?.statusPayment}`,
                severity: "error",
              }}
            />
          </div>

          <div
            style={{
              paddingTop: isDesktop ? "110px" : "80px",
              height: isDesktop ? "90vh" : "91vh",
            }}
            className="MAIN"
          >
            <h5 className="text-center">
              {dataBusinessOwner.shortDescription}
            </h5>
            <p style={{ textAlign: "justify" }}>
              {dataBusinessOwner.longDescription}
            </p>
            {dataPayment?.statusPayment &&
              dataPayment?.statusPayment !== "" && (
                <div className="alert alert-info">
                  <h6 className="text-center">
                    Status Payment: {dataPayment?.statusPayment}
                  </h6>
                </div>
              )}
            <ProductsCatalog
              emailUser={emailUser || ""}
              setIdProduct={(data) => console.log(data)}
            />
            <div style={{ height: "40px" }} className=""></div>
          </div>

          <div
            style={{ position: "fixed", zIndex: "9999999", height: "40px" }}
            className="FOOTER w-100"
          >
            <div
              style={{ backgroundColor: "#ddd" }}
              className="d-flex gap-2 fs-3 justify-content-center my-3 w-100"
            >
              <a
                style={{ color: "inherit" }}
                href={`tel:+52${dataBusinessOwner.phone}`}
              >
                <strong>
                  <FaPhoneAlt />
                </strong>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
                href={googleUbi}
              >
                <strong>
                  <FaMapMarkerAlt />
                </strong>
              </a>
              <a style={{ color: "inherit" }} href={dataBusinessOwner.webSite}>
                <strong>
                  <FaGlobe />
                </strong>
              </a>
              <a style={{ color: "inherit" }} href={dataBusinessOwner.facebook}>
                <strong>
                  <FaFacebook />
                </strong>
              </a>
              <a
                style={{ color: "inherit" }}
                href={dataBusinessOwner.instagram}
              >
                <strong>
                  <FaInstagram />
                </strong>
              </a>
              <a style={{ color: "inherit" }} href={dataBusinessOwner.twitter}>
                <strong>
                  <FaTwitter />
                </strong>
              </a>
            </div>
          </div>
        </div>
      )}

      {errorDataUser && (
        <h3 className="text-center">No se encontraron datos del usuario</h3>
      )}
    </>
  );
};

export default ShowProfile;
