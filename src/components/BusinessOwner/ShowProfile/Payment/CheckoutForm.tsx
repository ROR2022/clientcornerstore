import React, { useEffect, useState, FC } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import { Spinner } from "react-bootstrap";
import { getDataBusinessOwnerById } from "@/api/apiUsers";

interface CheckoutFormProps {
  emailBO: string;
  dataIdSale: string;
}

const CheckoutForm:FC<CheckoutFormProps>=({ emailBO, dataIdSale})=> {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dataLocalStorage, setDataLocalStorage, setDataLocalStorageShoppingCart } = useContext(MyContext);
  const [isSubmited, setIsSubmited] = useState(false);
  //const [emailBusinessOwner, setEmailBusinessOwner] = useState(emailBO);

  /* useEffect(() => {
    console.log('dataLocalStorage:...', dataLocalStorage);
    if(dataLocalStorage.businessOwner!==''){
      getDataBusinessOwnerById(dataLocalStorage.businessOwner).then((response) => {
        console.log('response(getDataBusinessOwnerById):...', response);
        const { email } = response;
        setEmailBusinessOwner(email);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [dataLocalStorage]);
 */

  useEffect(() => {
    console.log("message(CheckoutForm):...", message);
    if (message === "Payment succeeded!") {
      console.log("Pago exitoso");
      setDataLocalStorage({
        ...dataLocalStorage,
        dataPayment: null,
        statusPayment: "",
      });
    }
  },[]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    //console.log('clientSecret:...', clientSecret);
    if(isSubmited){
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      const id_payment_intent = paymentIntent?.id;
      //extraer el id del payment intent del cllientSecret
      const id_payment_intent_client_secret =
        clientSecret?.split("_secret_")[0];
      //comparar si el id del payment intent es igual al id del payment intent del client secret
      if (id_payment_intent !== id_payment_intent_client_secret) {
        console.log("borrando paymentIntent:...", id_payment_intent);
        setDataLocalStorage({ ...dataLocalStorage, dataPayment: null });
        return;
      }
      if (id_payment_intent === id_payment_intent_client_secret) {
        console.log("paymentIntent:...", paymentIntent);
        console.log("statusPayment:...", paymentIntent?.status);
        if (paymentIntent?.status === "succeeded") {
          setDataLocalStorageShoppingCart([]);
        }
        setDataLocalStorage({
          ...dataLocalStorage,
          dataPayment: paymentIntent,
          statusPayment: paymentIntent?.status,
          completeShoppingNumber: dataLocalStorage.completeShoppingNumber + 1,
        });
      }
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setIsSubmited(true);

    //messagePayment=null&
    //payment_intent=pi_3PWP7DIEl2Ct58jI0aS8P8KA&
    //payment_intent_client_secret=pi_3PWP7DIEl2Ct58jI0aS8P8KA_secret_2ALIKel5R4Ucimf0jHPpbQ6pN&redirect_status=succeeded

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/business-owner/show-profile?email=${emailBO}&dataIdSale=${dataIdSale}&result=${message}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log("error:..", error);
      setMessage(error.message);
    } else {
      console.log("error:..", error);
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    setIsSubmited(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as any,
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="btn btn-outline-danger d-block me-auto ms-auto my-3"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner">
              <Spinner variant="primary" />
            </div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className="alert alert-danger text-center my-2"
        >
          {message}
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
