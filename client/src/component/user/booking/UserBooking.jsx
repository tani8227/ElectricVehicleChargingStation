import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../reducers/user/Auth/authThunks/getUserThunk';
import { Link } from 'react-router-dom';

// Utility to check if the current date matches a given date
const isToday = (date) => {
  const givenDate = new Date(date);
  const today = new Date();
  return givenDate.toDateString() === today.toDateString();
};

// Utility to convert 12-hour time to 24-hour format
const convertTo24HourFormat = (time) => {
  const [hour, period] = time.match(/\d+|AM|PM/g);
  let hour24 = parseInt(hour, 10);
  if (period === 'PM' && hour24 !== 12) hour24 += 12;
  if (period === 'AM' && hour24 === 12) hour24 = 0;
  return hour24;
};

// Check if the current time has passed the end time of a slot
const hasTimePassedSlotEnd = (date, slotTime) => {
  const times = slotTime.match(/\d+\s?(AM|PM)/g);
  if (!times || times.length < 2) return false;

  const [, endTime] = times;
  const endHour = convertTo24HourFormat(endTime);

  const slotEndTime = new Date(date);
  slotEndTime.setHours(endHour, 0, 0, 0);

  return new Date() > slotEndTime;
};

// Determine if the feedback button should be shown
const shouldShowFeedbackButton = (record) => {
  const bookingDate = new Date(record.bookedAt);
  const now = new Date();

  const isBookingToday = bookingDate.toDateString() === now.toDateString();
  const hasTimePassedEnd = hasTimePassedSlotEnd(record.bookedAt, record.time);

  return !record.feedbackGiven && (!isBookingToday || hasTimePassedEnd);
};

export default function UserBooking() {
  const dispatch = useDispatch();

  // Fetch auth user and user booking records from Redux
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState();
  const [flg, setFlg] = useState(false);

  useEffect(() => {
    // Only dispatch getUser if authUser is not yet set
    async function getdata() {
      const slotrecord = await dispatch(getUser()).unwrap();
      console.log('SlotRecord:', slotrecord);

      // Check if the correct data exists in slotrecord.user.slotbookrecord
      if (slotrecord && slotrecord.user && slotrecord.user.slotbookrecord) {
        setBookings(slotrecord.user.slotbookrecord); // Directly set the bookings array
        setFlg(true); // Set flag to indicate data is loaded
        setUserId(slotrecord.user._id);
      }
    }
    getdata();
  }, [dispatch]); // Empty dependency ensures this runs once

  if (!flg) {
    return <h1>Waiting...</h1>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Your Booking Records
      </Typography>

      {/* Render booking records dynamically */}
      <List>
        {bookings && bookings.length > 0 ? (
          bookings.map((record, index) => {
            const showFeedbackButton = shouldShowFeedbackButton(record);

            return (
              <ListItem key={index} sx={{ mb: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <ListItemText
                  primary={`Slot: ${record.time}`}
                  secondary={
                    <>
                      <Typography component="span">Bunk Name: {record.bunk}</Typography>
                      <br />
                      <Typography component="span">Amount: ₹{record.amount}</Typography>
                      <br />
                      <Typography component="span">Booked At: {new Date(record.bookedAt).toLocaleString()}</Typography>
                      <br />
                      <Typography component="span">Bunk ID: {record.bunkId}</Typography>
                      <br />
                      <Typography component="span">Payment ID: {record.paymentId}</Typography>
                      <br />
                      {/* Show "Give Feedback" Button only if feedback has not been given yet */}
                      {showFeedbackButton && (
                        <Link to={`/user/dashboard/feedback/?bunk=${record.bunk}&&userId=${userId}&&bunkId=${record.bunkId}&&slotId=${record.slotId}&&paymentId=${record.paymentId}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                          >
                            Give Feedback
                          </Button>
                        </Link>
                      )}

{record.feedbackGiven && (
  <Button
    variant="contained"
    sx={{
      mt: 2,
      backgroundColor: "primary.main",  
      color: "text.primary", 
      "&.Mui-disabled": {
        color: "#fafafa",  
        backgroundColor: "#9e9e9e", 
        boxShadow: "none",  
      }
    }}
    disabled
  >
    Feedback Given
  </Button>
)}


                    </>
                  }
                />
              </ListItem>
            );
          })
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            No bookings available.
          </Typography>
        )}
      </List>
    </Box>
  );
}
