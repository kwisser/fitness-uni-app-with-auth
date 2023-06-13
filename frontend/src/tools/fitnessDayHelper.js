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