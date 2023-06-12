import axios from '../api/axios';

const FOOD_URL = 'fitness/food/';

const fetchAvailableFitnessFood = async () => {
  try {
    const response = await axios.get(FOOD_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFoodItem = async (foodId) => {
  try {
    await axios.delete(`${FOOD_URL}${foodId}`);
    console.log("deleteFoodItem: ", foodId);
  } catch (error) {
    console.log(error);
  }
};


export default fetchAvailableFitnessFood;