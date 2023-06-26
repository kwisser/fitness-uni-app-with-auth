import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faFire, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const ExerciseItemActivity = ({ exercise, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState({ ...exercise });
  const availableExercises = useSelector(state => state.availableExercises);
  const [fullExerciseData, setFullExerciseData] = useState(exercise);

  useEffect(() => {
    const exerciseData = availableExercises.find(item => item._id === exercise.exerciseId);
    if (exerciseData) {
      const fullData = { ...exercise, ...exerciseData };
      setFullExerciseData(fullData);
      setEditedExercise(fullData); // Set editedExercise when fullExerciseData is set
    }
  }, [availableExercises, exercise]);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(exercise._id, editedExercise); // Aufruf der onEdit-Funktion in der übergeordneten Komponente
  };

  const handleDelete = () => {
    onDelete(exercise.exerciseId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExercise((prevExercise) => ({
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
              className="exercise-input"
            />
          ) : (
            fullExerciseData.name
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {editedExercise._id}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faStopwatch} className="icon" />
            <Typography variant="body2" style={{ marginLeft: '0.5rem' }}>
              Duration: {isEditing ? (
                <input
                  type="number"
                  name="timeInMinutes"
                  value={editedExercise.timeInMinutes}
                  onChange={handleInputChange}
                  className="exercise-input"
                />
              ) : (
                `${editedExercise.timeInMinutes} min`
              )}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFire} className="icon" />
            <Typography variant="body2" style={{ marginLeft: '0.5rem' }}>
              Energy Burned: {`${(editedExercise.energyBurned / editedExercise.baseTime * editedExercise.timeInMinutes).toFixed(2)} kcal`}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        {isEditing ? (
          <Button size="small" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} />
          </Button>
        ) : (
          <>
            <Button size="small" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} />
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

export default ExerciseItemActivity;
