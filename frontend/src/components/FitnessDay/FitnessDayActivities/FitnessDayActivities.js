import ExerciseActivities from './ExerciseActivities/ExerciseActivities';
import FoodActivities from './FoodActivities/FoodActivities';

const FitnessDayActivities = ({ dailyActivityData, setDailyActivityData }) => {

    return (
        <div className="fitness-day-activities">

            <FoodActivities dailyActivityData={dailyActivityData} setDailyActivityData={setDailyActivityData} />

            <ExerciseActivities dailyActivityData={dailyActivityData} setDailyActivityData={setDailyActivityData} />

        </div>
    );
}

export default FitnessDayActivities;