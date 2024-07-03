import { useEffect, useState, FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { STRIPE_PUBLIC_KEY_DEV } from "@/components/dataEnv";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import { createStripePayment } from "@/api/apiPayment";
import { Spinner } from "react-bootstrap";

interface StripePaymentProps {
  emailBO: string;
  dataIdSale: string;
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY_DEV || "");

const StripePayment: FC<StripePaymentProps> = ({ emailBO, dataIdSale }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [total, setTotal] = useState(0);
  const { dataLocalStorageShoppingCart, dataLocalStorage } =
    useContext(MyContext);
  const { access_token } = dataLocalStorage;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent();
    console.log('clientSecret(inicioStripePayment):...');
    if(clientSecret!==''){
      console.log('+++++++ clientSecret(inicioStripePayment):... ++++++++');
    }
    /* fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret)); */
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  const createPaymentIntent = async () => {
    try {
      setIsLoading(true);
      const result = await createStripePayment(
        dataLocalStorageShoppingCart,
        access_token,
        dataIdSale
      );
      console.log("result(createStripePayment):...", result);
      setIsLoading(false);
      if (result.clientSecret) {
        setClientSecret(result.clientSecret);
      }
      if (result.totalAmount) {
        setTotal(result.totalAmount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //crearemos una funcion para parsear el total a formato de moneda usd
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="App">
      {isLoading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" />
        </div>
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm emailBO={emailBO} dataIdSale={dataIdSale} />
          {total > 0 && (
            <h4 className="text-center">Total: {formatCurrency(total)}</h4>
          )}
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
