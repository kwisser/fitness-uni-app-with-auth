import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseItem from './ExerciseItem';
import fetchAviableFitnessExercises from '../../api/fitnessExercisesApi';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchAviableFitnessExercises().then(data => {
      setExercises(data);
    });
  }, []);

  return (
    <div>
      <div className="exercise-heading">
        <h2>Exercise List:</h2>
        <Link to="/exercises/add" className="add-exercise-link">
          Add Exercise
        </Link>
      </div>
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseItem key={exercise._id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
