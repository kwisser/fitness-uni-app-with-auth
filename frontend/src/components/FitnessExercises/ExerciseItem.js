import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faFire, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { updateFitnessExercise } from '../../api/fitness/exerciseApi';

const ExerciseItem = ({ exercise, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState({ ...exercise });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateFitnessExercise(editedExercise);
    setIsEditing(false);
    onEdit(exercise._id, editedExercise); // Aufruf der onEdit-Funktion in der übergeordneten Komponente
  };

  const handleDelete = () => {
    onDelete(exercise._id);
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
            editedExercise.name
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
                  name="baseTime"
                  value={editedExercise.baseTime}
                  onChange={handleInputChange}
                  className="exercise-input"
                />
              ) : (
                `${editedExercise.baseTime} min`
              )}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFire} className="icon" />
            <Typography variant="body2" style={{ marginLeft: '0.5rem' }}>
              Energy: {isEditing ? (
                <input
                  type="number"
                  name="energyBurned"
                  value={editedExercise.energyBurned}
                  onChange={handleInputChange}
                  className="exercise-input"
                />
              ) : (
                `${editedExercise.energyBurned} kcal`
              )}
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

export default ExerciseItem;
