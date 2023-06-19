import { Typography } from '@mui/material';


import { updateFitnessDayForProfile } from '../../../../api/fitnessDayApi';
import FoodItemActivity from './FoodItemActivity';

const FoodActivities = ({ dailyActivityData, setDailyActivityData }) => {

    const handleDeleteEatenFood = async (foodId) => {
        // Delete the food with the passed ID
        console.log("handleDeleteEatenFood: ", foodId);

        const updatedDailyActivityData = {
            ...dailyActivityData,
            food: dailyActivityData.food.filter(food => food.foodId !== foodId),
        };

        console.log("DailyActivityData: ", updatedDailyActivityData);

        try {
            updatedDailyActivityData.dayId = await dailyActivityData._id;
            updatedDailyActivityData.date = await dailyActivityData.date;
            const response = await updateFitnessDayForProfile(updatedDailyActivityData)
            if (response) {
                console.log("Updated dailyActivityData:", updatedDailyActivityData);
                // After a successful update, set the local state.
                setDailyActivityData(updatedDailyActivityData);
            }
        }
        catch (error) {
            console.log("Error updating dailyActivityData:", updatedDailyActivityData);
        }
    };

    const handleEditEatenFood = async (foodId, editedFood) => {
        // Edit the food with the passed ID
        console.log("handleEatenFood: ", foodId, editedFood);

        const updatedFoodItems = dailyActivityData.food.map((food) =>
            food.foodId === foodId ? editedFood : food
        );

        console.log("Updated foodItems: ", updatedFoodItems)

        const updatedDailyActivityData = {
            ...dailyActivityData,
            food: updatedFoodItems,
        };

        console.log("DailyActivityData: ", updatedDailyActivityData);

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
                <FoodItemActivity key={food._id} food={food} onDelete={handleDeleteEatenFood} onEdit={handleEditEatenFood} />
            ))}

        </div>
    );
}

export default FoodActivities;
