import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faFire, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const AddExercise = () => {
  const [exercise, setExercise] = useState({
    name: '',
    baseTime: '',
    energyBurned: ''
  });
  const navigate = useNavigate(); 

  const EXERCISE_URL = 'fitness/exercise';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value
    }));
  };

  const handleAddExercise = async () => {
    try {
      await axios.post(EXERCISE_URL, exercise);
      // Perform any necessary actions after successful addition
    } catch (error) {
      console.log(error);
      // Perform error handling if needed
    }
    navigate('/exercises');
  };

  return (
    <div>
      <h2>Add Exercise:</h2>
      <form>
        <label>
          Name:
        </label>
        <input type="text" name="name" value={exercise.name} onChange={handleInputChange} />

        <label>
          <FontAwesomeIcon icon={faStopwatch} />
           Base Time:
        </label>
        <input
          type="number"
          name="baseTime"
          value={exercise.baseTime}
          onChange={handleInputChange}
        />

        <label>
          <FontAwesomeIcon icon={faFire} />
          Energy Burned:
        </label>
        <input
          type="number"
          name="energyBurned"
          value={exercise.energyBurned}
          onChange={handleInputChange}
        />

        <button type="button" onClick={handleAddExercise}>
          <FontAwesomeIcon icon={faPlus} />
          Add
        </button>
      </form>
    </div>
  );
};

export default AddExercise;
