import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Profile from '../components/Profile/Profile';
import fetchProfileData from '../api/fitnessProfilesApi';
import { useParams, useNavigate } from "react-router-dom";

const Profiles = () => {
  const [profileData, setProfileData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.id)

  useEffect(() => {
    fetchProfileData().then(data => {
      setProfileData(data);
    });
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
