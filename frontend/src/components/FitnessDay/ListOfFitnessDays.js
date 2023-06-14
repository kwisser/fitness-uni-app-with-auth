import FitnessDay from "./FitnessDay";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllActivitysForProfileId } from '../../api/fitnessDayApi';

const FitnessDaysList = () => {

    const [activityData, setActivityData] = useState([]);
    const profile = useSelector(state => state.profile);

    useEffect(() => {
        fetchAllActivitysForProfileId(profile._id).then(data => {
            setActivityData(data);
        });
    }, []);

    return (
        <div>
            {activityData.map(day => (
                <FitnessDay userId={profile._id} />
            ))}
        </div>
    );
}

export default FitnessDaysList;
