import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Profile from '../components/Profile/Profile';

const Profiles = () => {
  const [profileData, setProfileData] = useState([]);

  const GET_PROFILES_URL = '/fitness/profiles';

  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3015/fitness/profiles',
    headers: {
      'Cookie': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjY0NzY1YjFkMjg1OTEzYjQ1ZWRiYmRhNSIsImlhdCI6MTY4NTUzOTkxNSwiZXhwIjoxNjg2MTQ0NzE1fQ.rozKPv7i2y6ImeN_P_7-2VWRSJDTJgHqXb0oXDoVtJM'
    },
    data: data
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_PROFILES_URL, {config
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

  return (
    <div>
      <h2>Your Profiles</h2>
      <ul>
      {profileData.map((profile) => (
        <Profile key={profile._id} profileData={profile} />
      ))}
      </ul>
      
    </div>
  );
};

export default Profiles;
