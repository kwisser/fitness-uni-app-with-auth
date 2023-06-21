import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Calendar from 'react-calendar';

import { fetchAllActivitiesForProfile } from '../../api/fitness/dayApi';
import { isDateInActivityList } from '../../utils/DateHelper';

import './Calendar.css'

const CalendarOverview = () => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date());
    const profile = useSelector(state => state.profile);
    const [datesWithActivityData, setDatesWithActivityData] = useState([]);

    useEffect(() => {
        const fetchAllFitnessDayForSelectedProfile = async () => {
            if (profile) {
                console.log("profile: ", profile);
                try {
                    const response = await fetchAllActivitiesForProfile(profile._id);
                    const listOfDates = response.map(day => day.date);
                    console.log("data: ", response);
                    console.log("listOfDates: ", listOfDates);
                    setDatesWithActivityData(listOfDates);
                } catch (error) {
                    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
                }
            }
        };
        fetchAllFitnessDayForSelectedProfile();
    }, [value, onChange, profile]);


    const handleDayClick = (value) => {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        // Hier können Sie die gewünschte Route angeben, zu der Sie navigieren möchten
        navigate('/day?date=' + formattedDate);
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Kalender
                </Typography>
                <div>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        onClickDay={handleDayClick}
                        tileClassName={({ date, view }) =>
                            date.getDate() === new Date().getDate() &&
                                date.getMonth() === new Date().getMonth() &&
                                date.getFullYear() === new Date().getFullYear() ? 'highlight'
                                : isDateInActivityList(date, datesWithActivityData) ? 'activity-day'
                                    : null
                        }
                    />
                </div>


            </Box>
        </Container>

    );
};

export default CalendarOverview;
