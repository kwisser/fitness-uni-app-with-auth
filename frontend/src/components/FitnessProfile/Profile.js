import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, IconButton, Box, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faRuler, faBirthdayCake, faVenusMars, faIdCard, faEdit, faSave, faWeight, faCopy } from '@fortawesome/free-solid-svg-icons';
import { deleteFitnessProfile, updateFitnessProfile } from '../../api/fitness/profileApi';

const Profile = ({ profileData, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateFitnessProfile(editedProfileData);
    setIsEditing(false);
    // Update the `profileData` with the new data
    setEditedProfileData(editedProfileData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = () => {
    deleteFitnessProfile(profileData._id).then(() => {
      onDelete(profileData._id);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedProfileData._id)
      .then(() => {
      })
      .catch(err => {
        // Failure feedback here. For example, show a toast or a tooltip
        console.log('Failed to copy text: ', err);
      });
  };

  return (
    <Box sx={{ padding: 3, border: '1px solid #ccc', borderRadius: 2, marginBottom: 2 }}>
      <h2>Profile</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
            {isEditing ? (
              <TextField
                name="name"
                value={editedProfileData.name}
                onChange={handleInputChange}
                label="Name"
              />
            ) : (
              <p>
                <span style={{ marginRight: '5px' }}>Name:</span>
                {editedProfileData.name}
              </p>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faRuler} style={{ marginRight: '5px' }} />
            {isEditing ? (
              <TextField
                type="number"
                name="height"
                value={editedProfileData.height}
                onChange={handleInputChange}
                label="Height"
              />
            ) : (
              <p>
                <span style={{ marginRight: '5px' }}>Height:</span>
                {editedProfileData.height}
              </p>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faWeight} style={{ marginRight: '5px' }} />
            {isEditing ? (
              <TextField
                type="number"
                name="weight"
                value={editedProfileData.weight}
                onChange={handleInputChange}
                label="Weight"
              />
            ) : (
              <p>
                <span style={{ marginRight: '5px' }}>Weight:</span>
                {editedProfileData.weight}
              </p>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faBirthdayCake} style={{ marginRight: '5px' }} />
            {isEditing ? (
              <TextField
                type="number"
                name="age"
                value={editedProfileData.age}
                onChange={handleInputChange}
                label="Age"
              />
            ) : (
              <p>
                <span style={{ marginRight: '5px' }}>Age:</span>
                {editedProfileData.age}
              </p>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faIdCard} style={{ marginRight: '5px' }} />
            {isEditing ? (
              <TextField
                type="text"
                name="_id"
                value={editedProfileData._id}
                onChange={handleInputChange}
                label="ID"
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '5px' }}>
                  ID:
                  {editedProfileData._id}
                </p>
                <IconButton aria-label="copy to clipboard" onClick={copyToClipboard}>
                  <FontAwesomeIcon icon={faCopy} />
                </IconButton>
              </div>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faVenusMars} style={{ marginRight: '5px' }} />
            {isEditing ? (
              <Select
                name="sex"
                value={editedProfileData.sex}
                onChange={handleInputChange}
              >
                <MenuItem value="1">Male</MenuItem>
                <MenuItem value="0">Female</MenuItem>
              </Select>
            ) : (
              <p>
                <span style={{ marginRight: '5px' }}>Sex:</span>
                {editedProfileData.sex === 1 ? 'Male' : 'Female'}
              </p>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} />
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        )}
        <IconButton onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Profile;
