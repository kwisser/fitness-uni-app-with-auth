export function createFitnessDayJSON(input, isFood, profileId, date) {
    console.log("createFitnessDayJSON Input: ", input);
    const result = {
        "date": date,
        "profileId": profileId,
    };

    if (isFood) {
        result.food = [
            {
                "foodId": input._id,
                "amount": input.baseAmount,
            },
        ];
    } else {
        result.exercise = [
            {
                "exerciseId": input._id,
                "timeInMinutes": input.baseTime,
            },
        ];
    }
    console.log("createdFitnessDayJSON: ", result);
    return result;
}

export const extractExerciseData = (exercise, exerciseDuration = exercise.baseTime) => {
    const extractedExercise = {
        exerciseId: exercise._id,
        timeInMinutes: parseInt(exerciseDuration)
    }
    return extractedExercise;
};

export const extractFoodIdAndAmount = (object) => {
    const { _id: foodId, baseAmount: amount } = object;
    console.log("extractFoodIdAndAmount: ", { foodId, amount });
    return { foodId, amount };
};