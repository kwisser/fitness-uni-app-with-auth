import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Profile from '../components/Profile/Profile';
import { useParams } from "react-router-dom";

const Profiles = () => {
  const [profileData, setProfileData] = useState([]);
  const params = useParams();
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

  return (
    <div>
      <h2>Your Profiles</h2>
      <ul>
      {profileDataToDisplay.map((profile) => (
        <Profile key={profile._id} profileData={profile} />
      ))}
      </ul>
      
    </div>
  );
};

export default Profiles;
