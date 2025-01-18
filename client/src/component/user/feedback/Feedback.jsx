import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { createFeedback } from "../../../reducers/user/feedback/feedbackThunks/createFeedbackThunk.jsx";
import { useDispatch } from "react-redux";

const FeedbackForm = () => {

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    bunkId: searchParams.get('bunkId'),
    slotId: searchParams.get('slotId'),
    userId: searchParams.get('userId'),
    paymentId: searchParams.get('paymentId'),
    name: "",
    message: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await dispatch(createFeedback(formData)).unwrap();
      console.log('Feedback created successfully:', response);
    } catch (error) {
      console.error('Error creating feedback:', error);
    }


  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#C5E1A5",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          {`${searchParams.get('bunk')}`}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="rating-label">Rating</InputLabel>
            <Select
              labelId="rating-label"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Submit Feedback
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default FeedbackForm;
