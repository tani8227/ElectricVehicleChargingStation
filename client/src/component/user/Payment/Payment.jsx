import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51QexKZ1jWmGDAY7mkgUdvYkXZd8poC8tkuxOksmWuT4zvm1Fi0k0jFIGTVmQ12Is3wdVxx5Kciasx2X2FDsKqmjw00IqCAdQhk"); // Replace with your Stripe Publishable Key

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
