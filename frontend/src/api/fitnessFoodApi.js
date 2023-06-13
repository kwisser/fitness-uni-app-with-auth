import axios from '../api/axios';

const FOOD_URL = 'fitness/food/';

const fetchAvailableFitnessFood = async (filter) => {
  let url = FOOD_URL;
  if (filter === "drinks") {
    url += "drink";
  } else if (filter === "food") {
    url += "food";
  }
  try {
    const response = await axios.get(url);
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