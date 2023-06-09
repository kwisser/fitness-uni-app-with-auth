import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

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
        <div>
            <h1>Days</h1>
            <div>
                <Calendar onChange={onChange} value={value} onClickDay={handleDayClick} tileClassName={({date, view}) =>
            date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear() ? 'highlight' : null
          }/>
            </div>
        </div>
    )
}

export default CalendarOverview;
