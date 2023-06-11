import React from 'react';
import { useSelector } from 'react-redux';
import ProfileSelector from '../components/Profile/ProfileSelector';
import ProfileDay from '../components/Profile/ProfileDay';

const Home = () => {
  const selectedProfile = useSelector(state => state.profile);

  return (
    <div>
      <h1>Home</h1>
      <ProfileSelector />
      {selectedProfile ? (
        <div>
          <ProfileDay key={selectedProfile._id} profileData={selectedProfile} />
        </div>
      ) : (
        <p>Kein Profil ausgewählt.</p>
      )}
    </div>
  );
};


export default Home;
