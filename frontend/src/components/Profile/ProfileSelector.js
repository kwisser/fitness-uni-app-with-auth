import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfile } from '../../actions/profileActions';
import fetchProfileData from '../../api/fitnessProfilesApi';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileSelector = () => {
  const [profiles, setProfiles] = useState([]);
  const dispatch = useDispatch();
  const selectedProfile = useSelector(state => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData()
      .then(data => {
        if (!data) {
          navigate('/login');
        }
        setProfiles(data);
        if (selectedProfile) {
          const profile = data.find(profile => profile._id === selectedProfile._id);
          if (profile) {
            dispatch(selectProfile(profile));
          }
        }
      })
  }, [dispatch, selectedProfile, navigate]);

  const handleSelectChange = (event) => {
    const selectedProfile = profiles.find(profile => profile._id === event.target.value);
    dispatch(selectProfile(selectedProfile));
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="profile-select-label">Profile</InputLabel>
      <Select
        labelId="profile-select-label"
        value={selectedProfile ? selectedProfile._id : ''}
        onChange={handleSelectChange}
        label="Profile"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {profiles.map(profile => (
          <MenuItem key={profile._id} value={profile._id}>
            {profile.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProfileSelector;
