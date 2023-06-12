export const getCurrentDate = () => {
    const date = new Date();

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}${month}${year}`;
};

const calculateBurnedCalories = (exercise, duration) => {
    console.log("exercise", exercise);
    const caloriesBurnedPerMinute = exercise.energyBurned / exercise.baseTime;
    console.log(duration)
    const totalBurnedCalories = caloriesBurnedPerMinute * duration;

    return totalBurnedCalories;
};


export const calculateCalories = (profile, activityData, listOfExecises) => {
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
    console.log("activityData", activityData);
    console.log("listOfFood", listOfFood);
    // Finden Sie die Gesamtkalorien für die konsumierten Lebensmittel
    let caloriesEaten = 0;
    for (let foodActivity of activityData.food) {
        // Finden Sie das entsprechende Lebensmittel im Store
        const foodItem = listOfFood.find(food => food._id === foodActivity.foodId);
        console.log("foodItem", foodItem);
        if (foodItem) {
            caloriesEaten += foodItem.baseAmount * foodActivity.amount / 100;
        }
    }
    return caloriesEaten;
};


export const calculateProtein = (profile) => {
    const proteinPerKg = 0.793664791;
    return proteinPerKg * profile.weight;
};