import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../reducers/user/Auth/authThunks/getUserThunk";
import { bookEVBunkSlot } from "../../../reducers/user/EVBunk/EVBunkSlots/bookEVBunkSlotThunk";
import { Box, Button, Typography, Paper, CircularProgress, Alert } from "@mui/material";

const PaymentForm = () => {
  const [searchParams] = useSearchParams();
  const bunkId = searchParams.get("bunkId");
  const slotId = searchParams.get("slotId");

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const authUser = useSelector((state) => state.Auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUser()).unwrap();
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, [dispatch]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not loaded properly. Please try again.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { paymentMethod, error: paymentError } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (paymentError) {
        setError(paymentError.message);
        setIsProcessing(false);
        return;
      }

      const booked = await dispatch(
        bookEVBunkSlot({
          paymentMethodId: paymentMethod.id,
          amount: 150*100,
          bunkId,
          slotId,
        })
      ).unwrap();

      if (booked) {
        setSuccess(true);
        navigate("/user/payment/success", { state: { bunkId, slotId } }); // Navigate to success page
      }
    } catch (err) {
      console.error("Payment or booking error:", err);
      setError("An error occurred while processing the payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, margin: "0 auto", p: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Make a Payment
      </Typography>
        <Box
          component="form"
          onSubmit={handlePayment}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              borderRadius: 1,
              backgroundColor: "#fafafa",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    fontFamily: "'Roboto', sans-serif",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#e63946",
                  },
                },
              }}
            />
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!stripe || isProcessing}
            startIcon={isProcessing && <CircularProgress size={20} color="inherit" />}
            sx={{
              textTransform: "none",
              backgroundColor: isProcessing ? "#bbb" : undefined,
            }}
          >
            {isProcessing ? "Processing..." : `Pay ₹150`}
          </Button>
        </Box>
    </Paper>
  );
};

export default PaymentForm;
