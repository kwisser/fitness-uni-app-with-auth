import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import Profile from '../components/Profile/Profile';
import { useParams, useNavigate } from "react-router-dom";

const Profiles = () => {
  const [profileData, setProfileData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.id)

  const GET_PROFILES_URL = '/fitness/profiles';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_PROFILES_URL, {
        });
        console.log(response);
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(profileData);

  let profileDataToDisplay = profileData;

  if(params.id) {
    profileDataToDisplay = profileData.filter(profile => profile._id === params.id);
  }

  const handleAddProfile = () => {
    navigate('/profiles/add'); // define this route in your router
  };

  return (
    <div>
      <h2>Your Profiles</h2>
      <button onClick={handleAddProfile}>
      <FontAwesomeIcon icon={faPlus} /> Add Profile
    </button>
      <ul>
      {profileDataToDisplay.map((profile) => (
        <Profile key={profile._id} profileData={profile} />
      ))}
      </ul>
      
    </div>
  );
};

export default Profiles;
