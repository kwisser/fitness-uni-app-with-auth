import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';

const AddProfile = () => {
  const [newProfileData, setNewProfileData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    sex: '',
    userId: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProfileData({
      ...newProfileData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/fitness/profile", newProfileData, {
      });
      
      console.log(response.data);
      // Here you might want to do something with the response
      // e.g. redirect the user to the newly created profile
      navigate(`/profiles`);
    } catch (error) {
      console.log(error);
      // Here you might want to handle the error
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={newProfileData.name}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        type="number"
        name="age"
        value={newProfileData.age}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Height"
        type="number"
        name="height"
        value={newProfileData.height}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Weight"
        type="number"
        name="weight"
        value={newProfileData.weight}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Sex"
        type="number"
        name="sex"
        value={newProfileData.sex}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="User ID"
        name="userId"
        value={newProfileData.userId}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        <FontAwesomeIcon icon={faPlus} /> Add Profile
      </Button>
    </Box>
  );
};

export default AddProfile;
