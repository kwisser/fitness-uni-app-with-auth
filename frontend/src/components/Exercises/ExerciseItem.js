import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faFire, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
import './Exercise.css';
import { useNavigate } from 'react-router-dom';


const ExerciseItem = ({ exercise }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState({ ...exercise });
  const navigate = useNavigate();

  const EXERCISE_URL = 'fitness/exercise/';

  const handleEdit = () => {
    setIsEditing(true);
  };

  const convertExerciseDataToUpdateJSON = (exerciseData) => {
    return {
      exerciseId: exerciseData._id,
      name: exerciseData.name,
      baseTime: exerciseData.baseTime,
      energyBurned: exerciseData.energyBurned
    };
  };

  const handleSave = () => {
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

  const handleDelete = () => {
    axios.delete(EXERCISE_URL + exercise._id)
      .then((response) => {
        console.log("Exercise deleted:", response.data);
        // Perform further actions after successful deletion if needed.
      })
      .catch((error) => {
        console.log(error);
        // Perform error handling if needed.
      });
    navigate(0);  
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
      <h3>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedExercise.name}
            onChange={handleInputChange}
          />
        ) : (
          editedExercise.name
        )}
      </h3>
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
            <p>{editedExercise.baseTime} sec</p>
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
            <p>{editedExercise.energyBurned} kcal</p>
          )}
        </div>
      </div>
      {isEditing ? (
        <button className="edit-btn" onClick={handleSave}>
          Save
        </button>
      ) : (
        <>
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
};

export default ExerciseItem;
