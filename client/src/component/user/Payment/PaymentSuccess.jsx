import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const { bunkId, slotId } = state || {};

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        🎉 Payment Successful!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Thank you for your booking.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/user/dashboard"
        sx={{ textTransform: "none" }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
