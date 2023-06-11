import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faFire, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteFitnessExercise, updateFitnessExercise } from '../../api/fitnessExercisesApi';


const ExerciseItem = ({ exercise, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState({ ...exercise });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateFitnessExercise(editedExercise);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteFitnessExercise(editedExercise._id);
    onDelete(exercise._id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExercise(prevExercise => ({
      ...prevExercise,
      [name]: value
    }));
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
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
        </Typography>
        <Typography variant="body2">
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
        </Typography>
      </CardContent>
      <CardActions>
        {isEditing ? (
          <Button size="small" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <>
            <Button size="small" onClick={handleEdit}>
              Edit
            </Button>
            <Button size="small" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ExerciseItem;
