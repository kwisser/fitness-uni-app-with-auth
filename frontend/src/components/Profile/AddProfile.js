import React, { useState } from 'react';
import axios from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddProfile = () => {
  const [newProfileData, setNewProfileData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    sex: "",
    userId: "",
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
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'YOUR_COOKIE_HERE',
        },
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleInputChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" onChange={handleInputChange} />
      </label>
      <label>
        Height:
        <input type="number" name="height" onChange={handleInputChange} />
      </label>
      <label>
        Weight:
        <input type="number" name="weight" onChange={handleInputChange} />
      </label>
      <label>
        Sex:
        <input type="number" name="sex" onChange={handleInputChange} />
      </label>
      <label>
        User ID:
        <input type="text" name="userId" onChange={handleInputChange} />
      </label>
      <button type="submit">
        <FontAwesomeIcon icon={faPlus} /> Add Profile
      </button>
    </form>
  );
};

export default AddProfile;
