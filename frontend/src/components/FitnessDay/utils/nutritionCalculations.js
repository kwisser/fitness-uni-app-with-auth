const calculateBurnedCalories = (exercise, duration) => {
    console.log("calculateBurnedCalories: ", exercise, duration)
    const caloriesBurnedPerMinute = exercise.energyBurned / exercise.baseTime;
    const totalBurnedCalories = caloriesBurnedPerMinute * duration;

    return totalBurnedCalories;
};


export const calculateBurnedExtraCaloriesTroughExercises = (profile, activityData, listOfExecises) => {
    console.log("calculateBurnedExtraCaloriesTroughExercises: ", profile, activityData, listOfExecises)
    console.log(profile)
    const { weight, height, age, sex } = profile;
    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    let extraCaloriesforExercises = 0;
    for (let exerciseActivity of activityData.exercise) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const exerciseItem = listOfExecises.find(exercise => exercise._id === exerciseActivity._id || exerciseActivity.exerciseId);
        if (exerciseItem) {
            extraCaloriesforExercises += calculateBurnedCalories(exerciseItem, exerciseActivity.timeInMinutes);
        }
    }

    // Berechnen Sie die Basiskalorien basierend auf dem Profil
    let baseCalories;
    if (sex === 0 || 'male') {
        baseCalories = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        baseCalories = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Addieren Sie die Lebensmittelkalorien zu den Basiskalorien
    const totalCalories = baseCalories + extraCaloriesforExercises;

    return totalCalories;
};

export const calculateReachedCalories = (activityData, listOfFood) => {

    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    let energyEaten = 0;
    for (let foodActivity of activityData.food) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const foodItem = listOfFood.find(food => food._id === foodActivity.foodId);
        if (foodItem) {
            const amountOfFoodEeaten = foodActivity.amount;
            const energy = parseInt(foodItem.energy);
            const baseAmount = foodItem.baseAmount;
            const nutrientPer100g = calculateNutrientPer100g(energy, baseAmount);
            energyEaten += (nutrientPer100g * amountOfFoodEeaten);
        }
    }
    return energyEaten;
};

export const calculateReachedProtein = (activityData, listOfFood) => {
    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    console.log("base amount: ", listOfFood[0].baseAmount)
    let proteinEaten = 0;
    if (!activityData.food) return 0;
    for (let foodActivity of activityData.food) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const foodItem = listOfFood.find(food => food._id === foodActivity.foodId);
        if (foodItem) {
            const amountOfFoodEeaten = foodActivity.amount;
            console.log("food item: " + foodItem.name + " protein: " + foodItem.protein + " amount: " + amountOfFoodEeaten)
            const protein = parseInt(foodItem.protein);
            const baseAmount = foodItem.baseAmount;
            const nutrientPer100g = calculateNutrientPer100g(protein, baseAmount);
            proteinEaten += (nutrientPer100g * amountOfFoodEeaten);
        }
    }
    console.log("proteinEaten: ", proteinEaten)
    return proteinEaten;
};

export const calculateReachedCarbs = (activityData, listOfFood) => {
    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    console.log("base amount: ", listOfFood[0].baseAmount)
    let carbsEaten = 0;
    if (!activityData.food) return 0;
    for (let foodActivity of activityData.food) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const foodItem = listOfFood.find(food => food._id === foodActivity.foodId);
        if (foodItem) {
            const amountOfFoodEeaten = foodActivity.amount;
            console.log("food item: " + foodItem.name + " carbs: " + foodItem.carbohydrates + " amount: " + amountOfFoodEeaten)
            const carbohydrates = parseInt(foodItem.carbohydrates);
            const baseAmount = foodItem.baseAmount;
            const nutrientPer100g = calculateNutrientPer100g(carbohydrates, baseAmount);
            carbsEaten += nutrientPer100g * amountOfFoodEeaten;
        }
    }
    console.log("carbsEaten: ", carbsEaten)
    return carbsEaten;
};

export const calculateReachedFat = (activityData, listOfFood) => {
    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    console.log("base amount: ", listOfFood[0].baseAmount)
    let fatEaten = 0;
    if (!activityData.food) return 0;
    for (let foodActivity of activityData.food) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const foodItem = listOfFood.find(food => food._id === foodActivity.foodId);
        if (foodItem) {
            const amountOfFoodEeaten = foodActivity.amount;
            console.log("food item: " + foodItem.name + " fat: " + foodItem.fat + " amount: " + amountOfFoodEeaten)
            const fat = parseInt(foodItem.fat);
            const baseAmount = foodItem.baseAmount;
            const nutrientPer100g = calculateNutrientPer100g(fat, baseAmount);
            fatEaten += nutrientPer100g * amountOfFoodEeaten;
        }
    }
    console.log("carbsEaten: ", fatEaten)
    return fatEaten;
};

const calculateNutrientPer100g = (nutrientAmount, baseAmount) => {
    return (nutrientAmount / baseAmount);
};


export const calculateProtein = (profile) => {
    const proteinPerKg = 0.793664791;
    return proteinPerKg * profile.weight;
};