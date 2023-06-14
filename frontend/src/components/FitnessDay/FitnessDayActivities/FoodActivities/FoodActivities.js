import { Typography } from '@mui/material';

import FoodItem from '../../../FitnessFood/FoodItem/FoodItem';

import { updateFitnessDayForProfile } from '../../../../api/fitnessDayApi';

const FoodActivities = ({ dailyActivityData, setDailyActivityData }) => {

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

    return (
        <div className="food-activities">

            <Typography variant="subtitle1">Essen:</Typography>
            {dailyActivityData.food && dailyActivityData.food.map((food) => (
                <FoodItem key={food._id} food={food} onDelete={handleDeleteEatenFood} />
            ))}

        </div>
    );
}

export default FoodActivities;
