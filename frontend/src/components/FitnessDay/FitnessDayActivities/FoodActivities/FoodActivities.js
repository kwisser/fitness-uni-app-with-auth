import { Typography } from '@mui/material';

import { updateFitnessDayForProfile } from '../../../../api/fitness/dayApi';

import FoodItemActivity from './FoodItemActivity';

const FoodActivities = ({ dailyActivityData, setDailyActivityData }) => {

    const handleDeleteEatenFood = async (foodId) => {

        const updatedDailyActivityData = {
            ...dailyActivityData,
            food: dailyActivityData.food.filter(food => food.foodId !== foodId),
        };

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

    return (
        <div className="food-activities">

            <Typography variant="subtitle1">Essen:</Typography>
            {dailyActivityData.food && dailyActivityData.food.map((food, index) => (
                <FoodItemActivity key={"food-activities-" + index} food={food} onDelete={handleDeleteEatenFood} onEdit={handleEditEatenFood} />
            ))}

        </div>
    );
}

export default FoodActivities;
