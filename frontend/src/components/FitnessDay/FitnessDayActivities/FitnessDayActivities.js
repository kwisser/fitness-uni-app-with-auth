import { Typography } from '@mui/material';

import FoodItem from '../../FitnessFood/FoodItem/FoodItem';
import ExerciseItem from '../../FitnessExercises/ExerciseItem';

import { updateFitnessDayForProfile } from '../../../api/fitnessDayApi';

const FitnessDayActivities = ({ renderedActivityData, dailyActivityData, setDailyActivityData }) => {

    const handleDeleteEatenFood = async (foodId) => {
        // Delete the food with the passed ID
        console.log("handleDeleteEatenFood: ", foodId);

        const updatedDailyActivityData = {
            ...dailyActivityData,
            food: dailyActivityData.food.filter(food => food.foodId !== foodId),
        };

        console.log("DailyActivityData: ", updatedDailyActivityData);
        console.log("Updated dailyActivityData: ", updatedDailyActivityData);

        try {
            await updateFitnessDayForProfile(updatedDailyActivityData)
            console.log("Updated dailyActivityData:", updatedDailyActivityData);
            // After a successful update, set the local state.
            setDailyActivityData(updatedDailyActivityData);
        }
        catch (error) {
            console.log("Error updating dailyActivityData:", updatedDailyActivityData);
            setDailyActivityData({ food: [], exercise: [] });
        }
    };

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
        <div className="fitness-day-activities">

            <Typography variant="subtitle1">Essen:</Typography>
            {renderedActivityData.food && renderedActivityData.food.map((food) => (
                <FoodItem key={food._id} food={food} onDelete={handleDeleteEatenFood} />
            ))}

            <Typography variant="subtitle1">Übungen:</Typography>
            {renderedActivityData.exercise && renderedActivityData.exercise.map((exercise) => (
                <ExerciseItem key={exercise._id} exercise={exercise} onDelete={handleDeleteExercise} />
            ))}

        </div>
    );
}

export default FitnessDayActivities;