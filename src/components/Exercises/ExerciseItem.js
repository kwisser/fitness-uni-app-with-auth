import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faFire } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
import './Exercise.css';

const ExerciseItem = ({ exercise }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState({ ...exercise });

  const EXERCISE_URL = 'fitness/exercise/';

  const handleEdit = () => {
    setIsEditing(true);
  };

  const convertExerciseDataToUpdateJSON = (exerciseData) => {
    console.log("Exercise Data: "+exerciseData);
    return {
      exerciseId: exerciseData._id,
      name: exerciseData.name,
      baseTime: exerciseData.baseTime,
      energyBurned: exerciseData.energyBurned
    };
  };

  const handleSave = () => {
    console.log("Converted ExerviseData: "+convertExerciseDataToUpdateJSON(editedExercise));
    axios.put(EXERCISE_URL, convertExerciseDataToUpdateJSON(editedExercise))
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsEditing(false);
        // Perform further actions after successful save if needed.
      })
      .catch((error) => {
        console.log(error);
        // Perform error handling if needed.
      });
  };

  const handleInputChange = (e) => { 
    const { name, value } = e.target;
    setEditedExercise(prevExercise => ({
      ...prevExercise,
      [name]: value
    }));
  };

  return (
    <div className="exercise-item">
      <h3>{exercise.name}</h3>
      <div className="exercise-details">
        <div className="detail">
          <FontAwesomeIcon icon={faStopwatch} className="icon" />
          {isEditing ? (
            <input
              type="number"
              name="baseTime"
              value={editedExercise.baseTime}
              onChange={handleInputChange}
            />
          ) : (
            <p>{exercise.baseTime} sec</p>
          )}
        </div>
        <div className="detail">
          <FontAwesomeIcon icon={faFire} className="icon" />
          {isEditing ? (
            <input
              type="number"
              name="energyBurned"
              value={editedExercise.energyBurned}
              onChange={handleInputChange}
            />
          ) : (
            <p>{exercise.energyBurned} kcal</p>
          )}
        </div>
      </div>
      {isEditing ? (
        <button className="edit-btn" onClick={handleSave}>
          Save
        </button>
      ) : (
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
      )}
    </div>
  );
};

export default ExerciseItem;
