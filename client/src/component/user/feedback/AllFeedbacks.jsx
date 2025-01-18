import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating, Card, CardContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getAllFeedback } from '../../../reducers/user/feedback/feedbackThunks/getAllfeedbackThunk';

const FeedbackList = () => {
    const dispatch = useDispatch();
    const [userFeedback, setUserFeedback] = useState([]);

    useEffect(() => {
        async function get() {
            try {
                const response = await dispatch(getAllFeedback()).unwrap();
                setUserFeedback(response.data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        }
        get();
    }, [dispatch]);

    if (!userFeedback.length) {
        return <h1>Loading...</h1>;
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f4f4f4',

            }}
        >
            <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
                User Feedbacks
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 2,
                    padding: 2,
                    width: '80%',
                    overflowX: 'scroll'
                }}>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        padding: 2,
                        backgroundColor: 'GrayText',
                    }}
                >
                    {userFeedback.map((feedback, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: 'fit-content', // Width of each card
                                borderRadius: 2,
                                boxShadow: 3,
                                backgroundColor: '#ffffff',
                                padding: 2,
                                margin: '10px',
                                transition: 'transform 0.3s ease',
                                scrollSnapAlign: 'center',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                    {feedback.name}
                                </Typography>
                                <Rating
                                    value={feedback.rating}
                                    readOnly
                                    precision={0.5}
                                    sx={{ alignSelf: 'flex-start' }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {feedback.message}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default FeedbackList;
