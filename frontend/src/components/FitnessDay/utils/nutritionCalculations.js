const calculateBurnedCalories = (exercise, duration) => {
    const caloriesBurnedPerMinute = exercise.energyBurned / exercise.baseTime;
    const totalBurnedCalories = caloriesBurnedPerMinute * duration;

    return totalBurnedCalories;
};


export const calculateBurnedExtraCaloriesTroughExercises = (profile, activityData, listOfExecises) => {
    const { weight, height, age, gender } = profile;
    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    let extraCaloriesforExercises = 0;
    for (let exerciseActivity of activityData.exercise) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const exerciseItem = listOfExecises.find(exercise => exercise._id === exerciseActivity._id);
        if (exerciseItem) {
            extraCaloriesforExercises += calculateBurnedCalories(exerciseItem, exerciseActivity.timeInMinutes);
        }
    }

    // Berechnen Sie die Basiskalorien basierend auf dem Profil
    let baseCalories;
    if (gender === 'male') {
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
    let caloriesEaten = 0;
    for (let foodActivity of activityData.food) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const foodItem = listOfFood.find(food => food._id === foodActivity.foodId);
        if (foodItem) {
            caloriesEaten += foodItem.baseAmount * foodActivity.amount / 100;
        }
    }
    return caloriesEaten;
};

export const calculateReachedProtein = (activityData, listOfFood) => {

    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    let proteinEaten = 0;
    if (!activityData.food) return 0;
    for (let foodActivity of activityData.food) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const foodItem = listOfFood.find(food => food._id === foodActivity.foodId);
        if (foodItem) {
            console.log("foodItem: " + foodItem);
            proteinEaten += foodItem.protein;
        }
    }
    return proteinEaten;
};


export const calculateProtein = (profile) => {
    const proteinPerKg = 0.793664791;
    return proteinPerKg * profile.weight;
};