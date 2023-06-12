import React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Day = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');

    return (
        <div>
            <Typography variant="h1">Day {date}</Typography>
        </div>
    );
};

export default Day;
