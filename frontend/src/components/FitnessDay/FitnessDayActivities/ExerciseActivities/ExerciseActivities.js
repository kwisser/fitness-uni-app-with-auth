import { Typography } from '@mui/material';

import ExerciseItemActivity from './ExerciseItemActivity';

import { updateFitnessDayForProfile } from '../../../../api/fitness/dayApi';

const ExerciseActivities = ({ dailyActivityData, setDailyActivityData }) => {

    const handleDeleteExercise = async (exerciseId) => {

        const updatedDailyActivityData = {
            ...dailyActivityData,
            exercise: dailyActivityData.exercise.filter(exercise => exercise._id !== exerciseId),
        };

        try {
            const response = await updateFitnessDayForProfile(updatedDailyActivityData);
            if (response) {
                setDailyActivityData(updatedDailyActivityData);
                console.log("Updated dailyActivityData:", updatedDailyActivityData);
            }
        } catch (error) {
            console.error("Error updating dailyActivityData:", updatedDailyActivityData);
        }
    }

    const handleSaveExercise = async (exerciseId, editedExercise) => {

        // Prepare the updated daily activity data but don't set it in the state yet
        const updatedExercises = dailyActivityData.exercise.map((exercise) =>
            exercise._id === exerciseId ? editedExercise : exercise
        );

        const updatedDailyActivityData = {
            ...dailyActivityData,
            exercise: updatedExercises,
        };

        updatedDailyActivityData.dayId = dailyActivityData._id;
        updatedDailyActivityData.date = dailyActivityData.date;

        try {
            const response = await updateFitnessDayForProfile(updatedDailyActivityData);
            if (response) {
                // If successful, set the daily activity data in the local state
                setDailyActivityData(updatedDailyActivityData);
                console.log("Updated dailyActivityData:", updatedDailyActivityData);
            }
        } catch (error) {
            console.log("Error updating daily activity data:", error);
        }
    };


    return (
        <div className="exercise-activities">
            <Typography variant="subtitle1">Übungen:</Typography>
            {dailyActivityData.exercise && dailyActivityData.exercise.map((exercise, index) => (
                < ExerciseItemActivity key={"exercise-activity-" + index } exercise={exercise} onDelete={handleDeleteExercise} onEdit={handleSaveExercise} />
            ))}
        </div>
    );
}

export default ExerciseActivities;
