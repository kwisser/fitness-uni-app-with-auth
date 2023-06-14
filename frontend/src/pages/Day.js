import React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FitnessDay from '../components/FitnessDay/FitnessDay';
import { formatDate } from '../utils/DateHelper';

const Day = () => {
    const profile = useSelector(state => state.profile);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = formatDate(searchParams.get('date'));


    return (
        <div>
            <Typography variant="h1">Day {date}</Typography>
            <FitnessDay userId={profile._id} date={date} />
        </div>

    );
};

export default Day;
