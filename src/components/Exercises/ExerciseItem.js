import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faFire } from '@fortawesome/free-solid-svg-icons';
import './Exercise.css';

const ExerciseItem = ({ exercise }) => {
  return (
    <div className="exercise-item">
      <h3>{exercise.name}</h3>
      <div className="exercise-details">
        <div className="detail">
          <FontAwesomeIcon icon={faStopwatch} className="icon" />
          <p>{exercise.baseTime} sec</p>
        </div>
        <div className="detail">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <p>{exercise.energyBurned} kcal</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;
