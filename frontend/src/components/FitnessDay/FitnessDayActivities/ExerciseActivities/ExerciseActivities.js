import { Typography } from '@mui/material';

import ExerciseItem from '../../../FitnessExercises/ExerciseItem';

import { updateFitnessDayForProfile } from '../../../../api/fitnessDayApi';

const ExerciseActivities = ({ dailyActivityData, setDailyActivityData }) => {

    const handleDeleteExercise = async (exerciseId) => {
        // Löschen Sie die Übung mit der übergebenen ID
        console.log("handleDeleteExercise: ", exerciseId);

        const updatedDailyActivityData = {
            ...dailyActivityData,
            exercise: dailyActivityData.exercise.filter(exercise => exercise.exerciseId !== exerciseId),
        };

        setDailyActivityData(updatedDailyActivityData);

        try {
            await updateFitnessDayForProfile(updatedDailyActivityData);
            console.log("Updated dailyActivityData:", updatedDailyActivityData);
        } catch (error) {
            console.log("Error updating dailyActivityData:", updatedDailyActivityData);
            setDailyActivityData({ food: [], exercise: [] });
        }
    }

    return (
        <div className="exercise-activities">

            <Typography variant="subtitle1">Übungen:</Typography>
            {dailyActivityData.exercise && dailyActivityData.exercise.map((exercise) => (
                <ExerciseItem key={exercise._id} exercise={exercise} onDelete={handleDeleteExercise} />
            ))}

        </div>
    );
}

export default ExerciseActivities;
