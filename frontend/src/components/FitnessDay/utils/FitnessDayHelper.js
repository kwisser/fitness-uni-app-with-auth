export function createFitnessDayJSON(input, isFood, profileId, date) {
    console.log("createFitnessDayJSON: ", input);
    const result = {
        "date": date,
        "profileId": profileId,
    };

    if (isFood) {
        result.food = [
            {
                "foodId": input.foodId,
                "amount": input.amount,
            },
        ];
    } else {
        result.exercise = [
            {
                "exerciseId": input.exerciseId,
                "timeInMinutes": input.timeInMinutes,
            },
        ];
    }
    return result;
}

export const extractExerciseData = (exercise, exerciseDuration = exercise.baseTime) => {
    return {
        exerciseId: exercise._id,
        timeInMinutes: parseInt(exerciseDuration)
    }
};

export const extractFoodIdAndAmount = (object) => {
    console.log("extractFoodIdAndAmount: ", object);
    const { _id: foodId, baseAmount: amount } = object;
    return { foodId, amount };
};