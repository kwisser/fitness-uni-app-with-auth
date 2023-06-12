import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const CalendarOverview = () => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        console.log(value);
    }, [value, onChange]);

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
                                date.getFullYear() === new Date().getFullYear() ? 'highlight' : null
                        }
                    />
                </div>
            </Box>
        </Container>

    );
};

export default CalendarOverview;
