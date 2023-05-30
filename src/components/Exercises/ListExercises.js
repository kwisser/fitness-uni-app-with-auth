import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ExerciseItem from './ExerciseItem';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const EXERCISE_URL = 'fitness/exercises/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(EXERCISE_URL, {
        });
        setExercises(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Exercise List:</h2>
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseItem key={exercise._id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
