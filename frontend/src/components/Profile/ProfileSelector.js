import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfile } from '../../actions/profileActions';
import fetchProfileData from '../../api/fitnessProfilesApi';

const ProfileSelector = () => {
  const [profiles, setProfiles] = useState([]);
  const dispatch = useDispatch();
  // Zugriff auf den ausgewählten Profilzustand aus dem Redux Store
  const selectedProfile = useSelector(state => state.profile);

  useEffect(() => {
    fetchProfileData().then(data => {
      setProfiles(data);
      console.log("Data: "+data)
      // Stellen Sie den ausgewählten Profilzustand wieder her, wenn die Komponente geladen wird
      if (selectedProfile) {
        const profile = data.find(profile => profile._id === selectedProfile._id);
        console.log("Profile: "+profile)
        if (profile) {
          dispatch(selectProfile(profile));
        }
      }
    });
  }, []);

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    const selectedProfile = profiles.find(profile => profile._id === event.target.value);
    console.log("Selected Profile: "+selectedProfile);
    dispatch(selectProfile(selectedProfile));
  }

  return (
    <select value={selectedProfile ? selectedProfile._id : ''} onChange={handleSelectChange}>
      <option value="">--Please choose a profile--</option>
      {profiles.map(profile => (
        <option key={profile._id} value={profile._id}>
          {profile.name}
        </option>
      ))}
    </select>
  );
}

export default ProfileSelector;
