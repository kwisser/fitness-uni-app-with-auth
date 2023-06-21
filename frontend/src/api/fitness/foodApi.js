/**
 * API functions to interact with the fitness/food endpoint.
 *
 * @module FoodApi
 */


import axios from '../axiosInstance';

const FOOD_URL = 'fitness/food/';


/**
 * Fetch available fitness food items. 
 * Filter parameter can be either "drinks" or "food" to get respective items.
 *
 * @async
 * @param {string} filter - The type of food items to fetch.
 * @returns {Promise<Object[]>} A promise that resolves to an array of available fitness food items.
 * @throws {Error} On any error, throws an error with a message.
 */

export const fetchAvailableFitnessFood = async (filter) => {
  let modifiedFoodUrl = FOOD_URL;
  if (filter === "drinks") {
    modifiedFoodUrl += "drink";
  } else if (filter === "food") {
    modifiedFoodUrl += "food";
  }
  try {
    const response = await axios.get(modifiedFoodUrl);
    return response.data;
  } catch (error) {
    console.error("Es gab einen Fehler beim Abrufen der verfügbaren Nahrungsmittel: ", error);
    throw error;
  }
};


/**
 * Delete a specific food item.
 *
 * @async
 * @param {string} foodId - The ID of the food item to delete.
 * @returns {Promise<Object>} A promise that resolves to the data of the deleted food item.
 * @throws {Error} On any error, throws an error with a message.
 */

export const deleteFoodItem = async (foodId) => {
  try {
    const response = await axios.delete(`${FOOD_URL}${foodId}`);
    console.log("Food deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Es gab einen Fehler beim Löschen des Exercises: ", error);
    throw error;
  }
};