import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';

import FitnessDay from '../components/FitnessDay/FitnessDay';
import ProfileSelector from '../components/FitnessProfile/ProfileSelector';
import { formatDate } from '../utils/DateHelper';

const Day = () => {
    const profile = useSelector(state => state.profile);
    const selectedProfile = useSelector(state => state.profile);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const readableDate = searchParams.get('date')
    const date = formatDate(readableDate);

    console.log("Day: ", date);
    console.log(profile)

    return (
        <div>
            <Typography variant="h1">Day {readableDate}</Typography>
            <ProfileSelector />
            {selectedProfile ? (
                <div>
                    <FitnessDay userId={selectedProfile._id} date={date} />
                </div>
            ) : (
                <p>Kein Profil ausgewählt.</p>
            )}
        </div>
    );
};

export default Day;
