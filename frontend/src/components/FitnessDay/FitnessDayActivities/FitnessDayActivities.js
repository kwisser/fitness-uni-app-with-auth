import ExerciseActivities from './ExerciseActivities/ExerciseActivities';
import FoodActivities from './FoodActivities/FoodActivities';

const FitnessDayActivities = ({ renderedActivityData, dailyActivityData, setDailyActivityData }) => {

    return (
        <div className="fitness-day-activities">

            <FoodActivities renderedActivityData={renderedActivityData} dailyActivityData={dailyActivityData} setDailyActivityData={setDailyActivityData} />

            <ExerciseActivities renderedActivityData={renderedActivityData} dailyActivityData={dailyActivityData} setDailyActivityData={setDailyActivityData} />

        </div>
    );
}

export default FitnessDayActivities;