import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, IconButton, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faRuler, faBirthdayCake, faVenusMars, faIdCard, faEdit, faSave, faWeight, faCopy } from '@fortawesome/free-solid-svg-icons';
import { deleteFitnessProfile, updateFitnessProfile } from '../../api/fitnessProfilesApi';

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
    navigator.clipboard.writeText(editedProfileData.userId)
      .then(() => {
        // Success feedback here. For example, show a toast or a tooltip
        console.log('Copied to clipboard');
      })
      .catch(err => {
        // Failure feedback here. For example, show a toast or a tooltip
        console.log('Failed to copy text: ', err);
      });
  };

  return (
    <Box sx={{ padding: 3, border: '1px solid #ccc', borderRadius: 2, marginBottom: 2 }}>
      <h2>Profile</h2>
      <Box sx={{ marginBottom: 2 }}>
        <FontAwesomeIcon icon={faUser} />
        {isEditing ? (
          <TextField
            name="name"
            value={editedProfileData.name}
            onChange={handleInputChange}
            label="Name"
          />
        ) : (
          <p>Name: {editedProfileData.name}</p>
        )}
      </Box>
      {/* Continue for the rest of the items... */}
      <Box sx={{ marginBottom: 2 }}>
        <FontAwesomeIcon icon={faRuler} />
        {isEditing ? (
          <TextField
            type="number"
            name="height"
            value={editedProfileData.height}
            onChange={handleInputChange}
            label="Height"
          />
        ) : (
          <p>Height: {editedProfileData.height}</p>
        )}
      </Box>
      {/* ... and so on ... */}
      <Box sx={{ marginBottom: 2 }}>
        <FontAwesomeIcon icon={faBirthdayCake} />
        {isEditing ? (
          <TextField
            type="number"
            name="age"
            value={editedProfileData.age}
            onChange={handleInputChange}
            label="Age"
          />
        ) : (
          <p>Age: {editedProfileData.age}</p>
        )}
      </Box>
      <Box sx={{ marginBottom: 2 }}>
  <FontAwesomeIcon icon={faWeight} />
  {isEditing ? (
    <TextField
      type="number"
      name="weight"
      value={editedProfileData.weight}
      onChange={handleInputChange}
      label="Weight"
    />
  ) : (
    <p>Weight: {editedProfileData.weight}</p>
  )}
</Box>

<Box sx={{ marginBottom: 2 }}>
  <FontAwesomeIcon icon={faBirthdayCake} />
  {isEditing ? (
    <TextField
      type="number"
      name="age"
      value={editedProfileData.age}
      onChange={handleInputChange}
      label="Age"
    />
  ) : (
    <p>Age: {editedProfileData.age}</p>
  )}
</Box>

<Box sx={{ marginBottom: 2 }}>
  <FontAwesomeIcon icon={faIdCard} />
  {isEditing ? (
    <TextField
      type="text"
      name="_id"
      value={editedProfileData._id}
      onChange={handleInputChange}
      label="ID"
    />
  ) : (
    <div>
      <p>ID: {editedProfileData._id}</p>
      <IconButton aria-label="copy to clipboard" onClick={copyToClipboard}>
      <FontAwesomeIcon icon={faCopy} />
      </IconButton>
    </div>
  )}
</Box>

<Box sx={{ marginBottom: 2 }}>
  <FontAwesomeIcon icon={faVenusMars} />
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
    <p>Sex: {editedProfileData.sex === 1 ? 'Male' : 'Female'}</p>
  )}
</Box>
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