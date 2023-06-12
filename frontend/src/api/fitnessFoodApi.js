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

export default fetchAvailableFitnessFood;