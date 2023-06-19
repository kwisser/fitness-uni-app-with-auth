import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Profile from '../components/FitnessProfile/Profile';
import fetchProfileData from '../api/fitnessProfilesApi';
import { useParams, useNavigate } from "react-router-dom";

const Profiles = () => {
  const [profileData, setProfileData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData().then(data => {
      setProfileData(data);
    });
  }, []);

  const handleDelete = (deletedProfileId) => {
    setProfileData(profileData.filter(profile => profile._id !== deletedProfileId));
  };

  let profileDataToDisplay = profileData;

  if (params.id) {
    profileDataToDisplay = profileData.filter(profile => profile._id === params.id);
  }

  const handleAddProfile = () => {
    navigate('/profiles/add');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Profiles</h2>
        <button onClick={handleAddProfile}>
          <FontAwesomeIcon icon={faPlus} /> Add Profile
        </button>
      </div>
      <ul>
        {profileDataToDisplay.map((profile) => (
          <Profile key={profile._id} profileData={profile} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default Profiles;
